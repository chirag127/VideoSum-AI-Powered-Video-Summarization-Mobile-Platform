import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
  ActivityIndicator,
  Alert,
  FlatList,
  Image
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';

// Assuming a shared theme file exists at this path for consistent UI across the app.
// Example content for theme.ts:
// export const theme = {
//   colors: { primary: '#6200EE', accent: '#03DAC6', background: '#F5F5F5', surface: '#FFFFFF', textPrimary: '#212121', textSecondary: '#757575', onPrimary: '#FFFFFF', error: '#B00020', success: '#4CAF50', warning: '#FFC107', border: '#E0E0E0', shadow: '#000000' },
//   spacing: { xxs: 4, xs: 8, sm: 12, md: 16, lg: 24, xl: 32 },
//   fontSizes: { h1: 32, h3: 24, body: 16, button: 18, small: 14 },
//   borderRadius: { sm: 4, md: 8, lg: 12 },
// };
import { theme } from '../shared/styles/theme';

// Define the shape of a video summary object.
// In a larger project, this interface would typically be in a shared types directory,
// e.g., `src/shared/types/video.ts` for reusability.
export interface VideoSummary {
  id: string;
  title: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  summaryText: string | null;
  videoUri: string;
  thumbnailUri: string | null; // URI for a video thumbnail image
  timestamp: string;
}

const DUMMY_SUMMARIES: VideoSummary[] = [
  {
    id: 'sum_001',
    title: 'Q3 Financial Review Meeting',
    status: 'completed',
    summaryText: 'Key highlights from the Q3 financial review meeting: revenue grew by 15%, profit margin improved to 8%, and new market expansion is on track for Q4. Focus on digital transformation initiatives moving forward.',
    videoUri: 'file:///dummy/video1.mp4',
    thumbnailUri: 'https://via.placeholder.com/100x75/FF5733/FFFFFF?text=Q3+Review',
    timestamp: '2023-11-20T10:00:00Z',
  },
  {
    id: 'sum_002',
    title: 'Product Launch Brainstorm',
    status: 'processing',
    summaryText: null,
    videoUri: 'file:///dummy/video2.mp4',
    thumbnailUri: 'https://via.placeholder.com/100x75/33FF57/FFFFFF?text=Launch+Plan',
    timestamp: '2023-11-22T14:30:00Z',
  },
  {
    id: 'sum_003',
    title: 'Daily Standup - Nov 21',
    status: 'failed',
    summaryText: 'Failed to process due to unsupported video format or network error during upload.',
    videoUri: 'file:///dummy/video3.mp4',
    thumbnailUri: 'https://via.placeholder.com/100x75/3357FF/FFFFFF?text=Standup',
    timestamp: '2023-11-21T09:15:00Z',
  },
];

const HomeScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [videoUri, setVideoUri] = useState<string | null>(null);
  const [summaries, setSummaries] = useState<VideoSummary[]>(DUMMY_SUMMARIES);
  const [error, setError] = useState<string | null>(null);

  // Request media library and camera permissions on component mount
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status: mediaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (mediaStatus !== 'granted') {
          Alert.alert('Permission Required', 'Please grant media library access to upload videos.');
        }
        const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
        if (cameraStatus !== 'granted') {
          Alert.alert('Permission Required', 'Please grant camera access to record videos.');
        }
      }
    })();
  }, []);

  const handlePickVideo = async () => {
    try {
      setError(null);
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        setVideoUri(uri);
        startSummarization(uri);
      }
    } catch (err: any) {
      console.error('Error picking video:', err);
      setError('Failed to pick video: ' + (err.message || 'Unknown error.'));
      Alert.alert('Error', 'Failed to pick video. Please try again.');
    }
  };

  const handleRecordVideo = async () => {
    try {
      setError(null);
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        setVideoUri(uri);
        startSummarization(uri);
      }
    } catch (err: any) {
      console.error('Error recording video:', err);
      setError('Failed to record video: ' + (err.message || 'Unknown error.'));
      Alert.alert('Error', 'Failed to record video. Please try again.');
    }
  };

  const startSummarization = async (uri: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // This is a placeholder for actual backend integration.
      // In a real application, this would involve:
      // 1. Uploading the video file (uri) to a secure cloud storage (e.g., AWS S3, Google Cloud Storage).
      // 2. Making an authenticated API call to a backend service.
      //    This backend would typically orchestrate the AI processing (e.g., using Google Gemini API as per agent directives).
      //    The AI would perform: speech-to-text transcription, key-phrase extraction, and summarization.
      // 3. The backend would return a job ID, and subsequent status updates would be polled or pushed via webhooks/websockets.
      // 4. A thumbnail might also be generated by the backend.

      // Simulate API call and processing delay
      await new Promise(resolve => setTimeout(resolve, 3000));

      const newSummary: VideoSummary = {
        id: `sum_${Date.now()}`,
        title: `New Video Summary ${summaries.length + 1}`,
        status: 'processing', // Initial status
        summaryText: null,
        videoUri: uri,
        thumbnailUri: 'https://via.placeholder.com/100x75/CCCCCC/FFFFFF?text=Processing...',
        timestamp: new Date().toISOString(),
      };

      setSummaries(prev => [newSummary, ...prev]); // Add to the top of the list
      Alert.alert('Processing Started', 'Your video is now being analyzed by AI. We will notify you when the summary is ready!');

      // Simulate completion or failure after some time for demonstration
      setTimeout(() => {
        setSummaries(prev =>
          prev.map(s =>
            s.id === newSummary.id
              ? {
                  ...s,
                  status: Math.random() > 0.1 ? 'completed' : 'failed', // 10% chance of failure
                  summaryText: Math.random() > 0.1
                    ? 'This is a simulated AI-generated summary showcasing the distilled content from your video. Key points, actions, and decisions are extracted for quick comprehension.'
                    : 'Video processing failed. Please check the video format or try again later.',
                  thumbnailUri: Math.random() > 0.1
                    ? 'https://via.placeholder.com/100x75/5CB85C/FFFFFF?text=Completed'
                    : 'https://via.placeholder.com/100x75/D9534F/FFFFFF?text=Failed',
                }
              : s
          )
        );
      }, 7000); // Simulate 7 seconds of AI processing

    } catch (err: any) {
      console.error('Error starting summarization:', err);
      setError('Failed to initiate summarization: ' + (err.message || 'Unknown error.'));
      Alert.alert('Error', 'Could not start summarization. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderSummaryItem = ({ item }: { item: VideoSummary }) => (
    <TouchableOpacity
      style={styles.summaryCard}
      onPress={() => {
        if (item.status === 'completed' && item.summaryText) {
          Alert.alert(item.title, item.summaryText);
        } else if (item.status === 'failed') {
          Alert.alert('Processing Failed', item.summaryText || 'The video could not be summarized.');
        } else {
          Alert.alert('Processing...', 'Your video is currently being processed. Please check back later.');
        }
      }}
    >
      {item.thumbnailUri && <Image source={{ uri: item.thumbnailUri }} style={styles.thumbnail} />}
      <View style={styles.summaryContent}>
        <Text style={styles.summaryTitle}>{item.title}</Text>
        <Text style={styles.summaryStatus}>
          Status: <Text style={[
            styles.statusText,
            item.status === 'completed' && { color: theme.colors.success },
            item.status === 'processing' && { color: theme.colors.warning },
            item.status === 'failed' && { color: theme.colors.error },
          ]}>{item.status.toUpperCase()}</Text>
        </Text>
        {item.summaryText && item.status === 'completed' &&
          <Text style={styles.summarySnippet} numberOfLines={2}>{item.summaryText}</Text>
        }
        {item.summaryText && item.status === 'failed' &&
          <Text style={[styles.summarySnippet, { color: theme.colors.error }]} numberOfLines={2}>{item.summaryText}</Text>
        }
        {item.status === 'processing' &&
          <Text style={styles.summarySnippet} numberOfLines={1}>AI is hard at work...</Text>
        }
      </View>
      <MaterialIcons name="chevron-right" size={24} color={theme.colors.textSecondary} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>VideoSum</Text>
        <Text style={styles.headerSubtitle}>AI-Powered Video Summarization</Text>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.button} onPress={handlePickVideo} disabled={isLoading}>
          <MaterialIcons name="cloud-upload" size={24} color={theme.colors.onPrimary} />
          <Text style={styles.buttonText}>Upload Video</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleRecordVideo} disabled={isLoading}>
          <MaterialIcons name="videocam" size={24} color={theme.colors.onPrimary} />
          <Text style={styles.buttonText}>Record Video</Text>
        </TouchableOpacity>
      </View>

      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.loadingText}>Analyzing video with AI...</Text>
        </View>
      )}

      {error && <Text style={styles.errorText}>{error}</Text>}

      <View style={styles.summariesListContainer}>
        <Text style={styles.sectionTitle}>Recent Summaries</Text>
        <FlatList
          data={summaries}
          keyExtractor={(item) => item.id}
          renderItem={renderSummaryItem}
          ListEmptyComponent={<Text style={styles.emptyListText}>No summaries yet. Upload a video to get started!</Text>}
          contentContainerStyle={styles.flatListContent}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    paddingBottom: theme.spacing.lg,
  },
  headerTitle: {
    fontSize: theme.fontSizes.h1,
    fontWeight: 'bold',
    color: theme.colors.onPrimary,
    marginBottom: theme.spacing.xxs,
  },
  headerSubtitle: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.onPrimary,
    opacity: 0.8,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.border,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.accent,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    elevation: 2,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: theme.colors.onPrimary,
    fontSize: theme.fontSizes.button,
    fontWeight: '600',
    marginLeft: theme.spacing.sm,
  },
  loadingContainer: {
    padding: theme.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.surface,
    marginHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginTop: theme.spacing.md,
  },
  loadingText: {
    marginTop: theme.spacing.md,
    fontSize: theme.fontSizes.body,
    color: theme.colors.textSecondary,
  },
  errorText: {
    color: theme.colors.error,
    textAlign: 'center',
    padding: theme.spacing.md,
    fontSize: theme.fontSizes.body,
  },
  summariesListContainer: {
    flex: 1,
    padding: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: theme.fontSizes.h3,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
    marginTop: theme.spacing.md,
  },
  flatListContent: {
    paddingBottom: theme.spacing.lg,
  },
  summaryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.sm,
    elevation: 1,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  thumbnail: {
    width: 100,
    height: 75,
    borderRadius: theme.borderRadius.sm,
    marginRight: theme.spacing.md,
    backgroundColor: theme.colors.border, // Placeholder background
    resizeMode: 'cover',
  },
  summaryContent: {
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  summaryTitle: {
    fontSize: theme.fontSizes.body,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  summaryStatus: {
    fontSize: theme.fontSizes.small,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xxs,
  },
  statusText: {
    fontWeight: 'bold',
  },
  summarySnippet: {
    fontSize: theme.fontSizes.small,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  emptyListText: {
    textAlign: 'center',
    marginTop: theme.spacing.xl,
    fontSize: theme.fontSizes.body,
    color: theme.colors.textSecondary,
  },
});

export default HomeScreen;
