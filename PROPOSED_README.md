# VideoSum: AI-Powered Video Summarizer Mobile App

[![Build Status](https://img.shields.io/github/actions/workflow/status/chirag127/VideoSum-AI-Video-Summarizer-Mobile-App/ci.yml?style=flat-square)](https://github.com/chirag127/VideoSum-AI-Video-Summarizer-Mobile-App/actions/workflows/ci.yml)
[![Code Coverage](https://img.shields.io/codecov/c/github/chirag127/VideoSum-AI-Video-Summarizer-Mobile-App?style=flat-square)](https://app.codecov.io/gh/chirag127/VideoSum-AI-Video-Summarizer-Mobile-App)
[![Tech Stack](https://img.shields.io/badge/Tech%20Stack-React%20Native%20%7C%20Expo%20%7C%20TypeScript-blue.svg?style=flat-square)](https://github.com/chirag127/VideoSum-AI-Video-Summarizer-Mobile-App)
[![Lint/Format](https://img.shields.io/badge/Lint%2FFormat-Biome-green.svg?style=flat-square)](https://github.com/chirag127/VideoSum-AI-Video-Summarizer-Mobile-App)
[![License](https://img.shields.io/badge/License-CC%20BY--NC%204.0-blue.svg?style=flat-square)](https://creativecommons.org/licenses/by-nc/4.0/)
[![GitHub Stars](https://img.shields.io/github/stars/chirag127/VideoSum-AI-Video-Summarizer-Mobile-App?style=flat-square&logo=github)](https://github.com/chirag127/VideoSum-AI-Video-Summarizer-Mobile-App/stargazers)


⭐ Star this Repo

---

## BLUF
VideoSum is an AI-powered mobile application (iOS/Android) that transforms lengthy videos into concise, actionable summaries. Boost your productivity and quickly extract the core insights from any video, anywhere.

## Architecture

mermaid
graph LR
  subgraph Mobile App
    A[React Native & Expo] --> B(UI Components);
    A --> C(API Integration);
    A --> D(State Management);
  end
  subgraph Backend (AI)
    C --> E(Video Processing);
    E --> F(AI Summarization);
    F --> G(Summary Generation);
  end
  B --> H(User Interface);
  G --> C;
  H --> A;

  style A fill:#f9f,stroke:#333,stroke-width:2px
  style B fill:#ccf,stroke:#333,stroke-width:2px
  style C fill:#ccf,stroke:#333,stroke-width:2px
  style D fill:#ccf,stroke:#333,stroke-width:2px
  style E fill:#ccf,stroke:#333,stroke-width:2px
  style F fill:#ccf,stroke:#333,stroke-width:2px
  style G fill:#ccf,stroke:#333,stroke-width:2px
  style H fill:#ccf,stroke:#333,stroke-width:2px



## Table of Contents

-   [BLUF](#bluf)
-   [Architecture](#architecture)
-   [AI Agent Directives](#ai-agent-directives)
-   [Development Standards](#development-standards)

---

<details>
<summary>🤖 AI AGENT DIRECTIVES</summary>

**Tech Stack:**

*   **Language:** JavaScript/TypeScript
*   **Framework:** React Native
*   **Environment:** Expo
*   **State Management:** (To be defined - e.g., Zustand, Redux)
*   **Styling:** TailwindCSS or similar
*   **Linting/Formatting:** Biome (speed) & ESLint
*   **Testing:** Vitest (Unit), Playwright (E2E)
*   **CI/CD:** GitHub Actions
*   **AI Integration:**
    *   OpenAI API (or similar) for video summarization.
    *   Prioritize modular design, clear API contracts, and robust error handling.

**Architectural Patterns:**

*   Feature-Sliced Design (FSD) for component organization.
*   Clean Architecture principles for separation of concerns.
*   SOLID principles.
*   DRY (Don't Repeat Yourself).
*   YAGNI (You Ain't Gonna Need It).

**Verification Commands:**

*   `npm install`: Installs all dependencies.
*   `npm run lint`: Runs Biome linter and formatter.
*   `npm run test`: Runs unit tests.
*   `npm run e2e`: Runs end-to-end tests.
*   `npm run build`: Builds the application.
*   `npm run start`: Runs the Expo development server.

</details>

---

## Development Standards

1.  **Setup:**
    *   `git clone https://github.com/chirag127/VideoSum-AI-Video-Summarizer-Mobile-App.git`
    *   `cd VideoSum-AI-Video-Summarizer-Mobile-App`
    *   `npm install`

2.  **Scripts:**

    | Script         | Description                                        | 
    | -------------- | -------------------------------------------------- | 
    | `npm run lint` | Runs the Biome linter and formatter.                  | 
    | `npm run test` | Runs unit tests using Vitest.                       | 
    | `npm run e2e`  | Runs end-to-end tests using Playwright.            | 
    | `npm run start`| Starts the Expo development server.                  | 
    | `npm run build`| Builds the React Native application for deployment. | 

3.  **Principles:**

    *   **SOLID:** Adhere to SOLID principles for maintainable code.
    *   **DRY:** Avoid code duplication.
    *   **YAGNI:** Implement features only when required.

