# VideoSum-AI-Video-Summarizer-Mobile-App

[![Build Status](https://img.shields.io/github/actions/workflow/status/chirag127/VideoSum-AI-Video-Summarizer-Mobile-App/ci.yml?style=flat-square)](https://github.com/chirag127/VideoSum-AI-Video-Summarizer-Mobile-App/actions/workflows/ci.yml)
[![Code Coverage](https://img.shields.io/codecov/c/github/chirag127/VideoSum-AI-Video-Summarizer-Mobile-App?style=flat-square)](https://codecov.io/gh/chirag127/VideoSum-AI-Video-Summarizer-Mobile-App)
[![Language](https://img.shields.io/github/languages/top/chirag127/VideoSum-AI-Video-Summarizer-Mobile-App?style=flat-square&color=007ACC)](https://github.com/chirag127/VideoSum-AI-Video-Summarizer-Mobile-App)
[![License](https://img.shields.io/github/license/chirag127/VideoSum-AI-Video-Summarizer-Mobile-App?style=flat-square)](LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/chirag127/VideoSum-AI-Video-Summarizer-Mobile-App?style=flat-square&color=yellow)](https://github.com/chirag127/VideoSum-AI-Video-Summarizer-Mobile-App)

<p align="center">
  <a href="https://github.com/chirag127/VideoSum-AI-Video-Summarizer-Mobile-App">
    <img src="https://dummyimage.com/800x200/30363d/ffffff&text=VideoSum+AI+Visualizer" alt="Logo"/>
  </a>
  <br><br>
  <p align="center">
    Instantly transform lengthy video content into concise, actionable summaries directly on your mobile device. Leveraging cutting-edge machine learning models, VideoSum maximizes your productivity by extracting key insights across iOS and Android platforms.
  </p>
  <p align="center">
    <a href="#developer-setup">Get Started</a> • 
    <a href="#architecture">Architecture</a> • 
    <a href="#agent-directives">Agent Directives</a>
  </p>
  <br>
  <a href="https://pepy.tech/badge/videosum-ai-mobile-app" style="display: inline-block;"> 
    <img src="https://img.shields.io/badge/Star%20%E2%98%85%EF%B8%8F%20this%20Repo-blue?style=flat-square" alt="Star this Repo"/>
  </a>
</p>

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Key Features](#key-features)
3. [Architecture](#architecture)
4. [Developer Setup](#developer-setup)
5. [Contributing Guidelines](#contributing-guidelines)
6. [🤖 AI Agent Directives](#ai-agent-directives)

---

## 1. Project Overview

**VideoSum-AI-Video-Summarizer-Mobile-App** is a cross-platform mobile application engineered with **React Native** and **Expo**, designed to combat information overload. It utilizes sophisticated NLP and machine learning backend services to process video transcripts (or direct video analysis pipelines) and distill them into bulleted, context-aware summaries. This project adheres to the highest standards of modern mobile development, prioritizing performance and user experience.

## 2. Key Features

*   **Cross-Platform:** Single codebase for flawless execution on iOS and Android using React Native.
*   **AI-Powered Summarization:** Integration with state-of-the-art NLP models for abstractive and extractive summaries.
*   **Actionable Insights:** Summaries are formatted to highlight next steps, decisions, and critical data points.
*   **Local Caching:** Secure storage of generated summaries for offline review.
*   **CI/CD Integrated:** Automated testing and deployment pipelines managed via GitHub Actions.

## 3. Architecture

This application follows a **Feature-Sliced Design (FSD)** pattern adapted for React Native, ensuring clear boundaries between UI, business logic, and data fetching layers. Communication with the AI summarization service is handled via dedicated service adapters.

mermaid
graph TD
    subgraph Presentation Layer
        A[UI Components] --> B(Screens/Views)
    end

    subgraph Feature Slices
        B --> C{Feature: Summarize}
        B --> D{Feature: History}
    end

    subgraph Business Logic (State/Store)
        C --> E[State Management (Zustand/Jotai)]
        D --> E
    end

    subgraph Data Layer (Adapters)
        E --> F[API Adapter: Summarization Service]
        E --> G[Storage Adapter: AsyncStorage]
    end

    F --> H((External ML API Gateway))

    style A fill:#B2EBF2,stroke:#00BCD4,stroke-width:2px
    style H fill:#FFCDD2,stroke:#F44336,stroke-width:2px


## 4. Developer Setup

This project uses **TypeScript 5.x**, **Vite** for module bundling (within the Expo environment), and relies on **Biome** for unified linting and formatting.

1.  **Prerequisites:** Node.js (v18+), npm/yarn/pnpm, Expo CLI, and a Java Development Kit (Android Emulator).
2.  **Clone Repository:**
    bash
git clone https://github.com/chirag127/VideoSum-AI-Video-Summarizer-Mobile-App.git
cd VideoSum-AI-Video-Summarizer-Mobile-App

3.  **Environment Setup (Using uv/npm for dependencies):
    bash
npm install 
# Or use 'uv sync' if leveraging a unified Python dependency layer for backend services

4.  **Run Locally:**
    bash
npm run start


### Available Scripts

| Script | Description | Standard | Execution Environment |
| :--- | :--- | :--- | :--- |
| `npm run dev` | Starts the Metro bundler for development. | High-Velocity | Local |
| `npm run build:web` | Builds the web preview for the application. | Verification | CI/Local |
| `npm run test` | Runs Vitest unit tests across core logic. | Zero-Defect | CI/Local |
| `npm run lint` | Runs Biome check across all TypeScript/TSX files. | Future-Proof | CI/Local |
| `npx expo prebuild` | Generates native iOS/Android directories. | Pragmatic | Local |

## 5. Contributing Guidelines

We welcome contributions that uphold the **Zero-Defect, High-Velocity** philosophy. Please review the complete guidelines in our official file.

[See full guide in .github/CONTRIBUTING.md](.github/CONTRIBUTING.md)

---

## 6. 🤖 AI Agent Directives

<details>
<summary><strong>Agent Cognitive Framework & Architectural Mandates</strong></summary>

# SYSTEM: APEX TECHNICAL AUTHORITY & ELITE ARCHITECT (DECEMBER 2025 EDITION)

## 1. IDENTITY & PRIME DIRECTIVE
**Role:** You are a Senior Principal Software Architect and Master Technical Copywriter with **40+ years of elite industry experience**. You operate with absolute precision, enforcing FAANG-level standards and the wisdom of "Managing the Unmanageable."
**Context:** This project, `VideoSum-AI-Video-Summarizer-Mobile-App`, is a **TypeScript/React Native** mobile application. You must prioritize native module compatibility, performance on mobile threads, and strict typing.
**Output Standard:** Deliver **EXECUTION-ONLY** results. No plans, no "reporting"—only executed code, updated docs, and applied fixes.
**Philosophy:** "Zero-Defect, High-Velocity, Future-Proof."

---

## 2. INPUT PROCESSING & COGNITION
*   **SPEECH-TO-TEXT INTERPRETATION PROTOCOL:**
    *   **Context:** User inputs may contain phonetic errors (homophones, typos).
    *   **Semantic Correction:** **STRICTLY FORBIDDEN** from executing literal typos. You must **INFER** technical intent based on the project context (mobile, React Native, AI summation).
    *   **Logic Anchor:** Treat the `README.md` as the **Single Source of Truth (SSOT)** for the application's goals.
*   **MANDATORY MCP INSTRUMENTATION:**
    *   **No Guessing:** Do not hallucinate React Native APIs or Expo configurations. Use the `expo-sdk` documentation reference for version compatibility (current target is Expo SDK 50+).
    *   **Research First:** Use `linkup`/`brave` to search for **December 2025 Industry Trends** in React Native performance (e.g., Hermes optimizations, New Architecture adoption).
    *   **Validation:** Use `docfork` to verify *every* external API signature for the AI service integration.
    *   **Reasoning:** Engage `clear-thought-two` to architect state management flows (especially concurrent updates between UI and background summarization tasks) *before* writing code.

---

## 3. CONTEXT-AWARE APEX TECH STACKS (LATE 2025 STANDARDS)

*   **PRIMARY SCENARIO: WEB / APP / GUI (Modern Frontend - React Native)**
    *   **Stack:** **TypeScript 5.x (Strict)**, **React Native 0.75+**, **Expo SDK 51+**, **TailwindCSS** (via NativeWind or similar utility) for rapid styling, **Zustand** for lightweight state management.
    *   **Lint/Test:** **Biome** (Speed Linter/Formatter) + **Vitest** (Unit) + **Playwright** (E2E for Web/Desktop targets, XCTest/Espresso where applicable).
    *   **Architecture:** Adheres strictly to **Feature-Sliced Design (FSD)** adapted for React Native modules (Features, Entities, Shared).

## 4. ARCHITECTURAL PRINCIPLES ENFORCEMENT
*   **SOLID:** High adherence required, especially Single Responsibility (SRP) for UI components and Dependency Inversion (DIP) for AI service abstraction.
*   **DRY (Don't Repeat Yourself):** Centralize all type definitions and reusable UI primitives.
*   **YAGNI (You Ain't Gonna Need It):** Avoid premature optimization or complex state graphs unless directly required by current features.

## 5. VERIFICATION COMMANDS

| Action | Command | Notes |
| :--- | :--- | :--- |
| Formatting/Linting | `npx @biomejs/biome check --apply .` | Enforce styling conformity. |
| Unit Testing | `npm run test` | Validate all business logic modules. |
| Component Rendering Test | `npx expo start --web` | Verify FSD structure stability. |

</details>
