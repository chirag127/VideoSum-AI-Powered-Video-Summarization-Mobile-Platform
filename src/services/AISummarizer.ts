import { environment } from '../config/environment';
import { LoggerService } from './LoggerService';

// --- Type Definitions ---

/** Defines the structure of the input data for summarization. */
export interface VideoMetadata {
  videoId: string;
  transcript: string; // Core input for AI model
  durationSeconds: number;
  sourceUrl: string;
}

/** Defines the structure of the AI-generated summary. */
export interface SummaryResult {
  title: string;
  summaryAbstract: string; // Long-form summary
  keyPoints: string[]; // Bulleted actionable points
  sentimentScore: number; // 0.0 to 1.0, derived from analysis
  tokenUsage: number;
}

/** Defines potential errors related to AI summarization. */
export class SummarizationError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(`[SummarizationError] ${message}`);
    this.name = 'SummarizationError';
  }
}

// --- Service Implementation ---

/**
 * Service responsible for orchestrating AI interactions for video summarization.
 * Adheres to Hexagonal Architecture (Ports & Adapters) by abstracting the external AI adapter (the backend proxy).
 * Follows Singleton pattern to ensure resource efficiency in a mobile context.
 */
export class AISummarizerService {
  private static instance: AISummarizerService;
  private readonly apiUrl: string;
  private readonly logger = LoggerService.getInstance();

  private constructor() {
    // In a production mobile app, AI API interaction must be proxied via a secure backend.
    this.apiUrl = environment.AI_PROXY_URL;
    if (!this.apiUrl) {
      // CRITICAL: Ensure configuration exists before runtime execution (Fail Fast Principle).
      this.logger.fatal('AISummarizerService initialized without a valid AI_PROXY_URL.');
      throw new SummarizationError('AI backend configuration missing.', 500);
    }
    this.logger.info('AISummarizerService initialized successfully.');
  }

  /** Singleton accessor. */
  public static getInstance(): AISummarizerService {
    if (!AISummarizerService.instance) {
      AISummarizerService.instance = new AISummarizerService();
    }
    return AISummarizerService.instance;
  }

  /**
   * Generates a comprehensive summary from video metadata using the secure AI proxy.
   *
   * @param metadata - The video transcript and source details.
   * @returns A promise that resolves to the structured SummaryResult.
   * @throws SummarizationError on network failure, validation errors, or API rejection.
   */
  public async generateSummary(metadata: VideoMetadata): Promise<SummaryResult> {
    if (!metadata.transcript || metadata.transcript.length < 100) {
      throw new SummarizationError('Transcript is too short or empty for meaningful summarization.', 400);
    }

    this.logger.debug(`Sending ${metadata.videoId} transcript (${metadata.transcript.length} chars) to AI proxy.`);

    try {
      // NOTE: Authentication token retrieval must use a secure mechanism (e.g., AsyncStorage or KeyChain access).
      const authToken = ''; // placeholder for actual secure token retrieval
      
      const response = await fetch(`${this.apiUrl}/summarize-video`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}` 
        },
        body: JSON.stringify({
          transcript: metadata.transcript,
          sourceId: metadata.videoId,
          duration: metadata.durationSeconds,
          // Request specific output configuration (e.g., Gemini 3 Pro model parameters handled by proxy)
          config: { outputFormat: 'structured_json' }
        }),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        this.logger.error(`AI Proxy request failed. Status: ${response.status}. Body: ${errorBody.substring(0, 150)}`);
        throw new SummarizationError(`AI service returned error: ${response.statusText}`, response.status);
      }

      const rawResult = await response.json();
      
      // Enforce data contract validation (YAGNI/DRY: Do not repeat complex model parsing client-side, rely on backend/proxy enforcement)
      const result: SummaryResult = this.validateSummaryStructure(rawResult);

      this.logger.verbose(`Summary successful for ${metadata.videoId}. Score: ${result.sentimentScore}.`);
      return result;

    } catch (error) {
      if (error instanceof SummarizationError) {
        throw error; // Re-throw custom errors
      }
      this.logger.error('Critical network failure during AI summarization.', error);
      // Ensure network-level errors are wrapped appropriately
      throw new SummarizationError(`Network service unreachable: ${(error as Error).message}`, 503);
    }
  }
  
  /**
   * Internal method for Type-Guarding and validating the API response structure.
   * Ensures compliance with the defined SummaryResult contract.
   */
  private validateSummaryStructure(data: any): SummaryResult {
    if (!data || typeof data.summaryAbstract !== 'string' || !Array.isArray(data.keyPoints) || typeof data.sentimentScore !== 'number') {
      this.logger.critical('AI Response Validation Failure: Received malformed structure.', data);
      throw new SummarizationError('AI output contract violated. Structure is invalid.', 500);
    }
    
    // Ensure all required fields exist, even if defaulted by the service.
    const validatedData: SummaryResult = {
      title: data.title || 'AI Generated Summary',
      summaryAbstract: data.summaryAbstract,
      keyPoints: data.keyPoints,
      sentimentScore: data.sentimentScore,
      tokenUsage: data.tokenUsage || 0,
    };
    
    return validatedData;
  }
}