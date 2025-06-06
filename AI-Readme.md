# Stay On Point - Project Setup Documentation

## Overview

This document outlines the setup and structure of the "Stay On Point" application - a cross-platform mobile app for Android and iOS that helps users practice delivering clear, concise messages using the PPP (Point-Proof-Purpose) structure.

## Project Structure

We've set up a comprehensive folder structure for developing the application on both Android and iOS platforms using React Native. The structure follows modern best practices for cross-platform mobile development.

### Root Structure

```
StayOnPoint/
├── app.json               # App metadata
├── App.tsx                # Main application component
├── babel.config.js        # Babel configuration
├── index.js               # Entry point
├── metro.config.js        # Metro bundler configuration
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── android/               # Android-specific files
├── ios/                   # iOS-specific files
└── src/                   # Source code
```

### Source Code Structure

```
src/
├── assets/                # Static assets
│   ├── audio/             # Sound files
│   ├── fonts/             # Custom fonts
│   └── images/            # Images and icons
├── components/            # Reusable UI components
│   ├── android/           # Android-specific components
│   ├── common/            # Platform-agnostic components
│   └── ios/               # iOS-specific components
├── config/                # App configuration
├── constants/             # App-wide constants
├── hooks/                 # Custom React hooks
├── localization/          # Translations and localization
├── navigation/            # Navigation configuration
├── screens/               # Application screens
├── services/              # API and service functions
├── store/                 # State management (Redux)
│   ├── actions/           # Action creators
│   ├── reducers/          # Reducers
│   ├── selectors/         # Selectors
│   └── slices/            # Redux toolkit slices
├── styles/                # Shared styles
├── theme/                 # Theming system
└── utils/                 # Utility functions
```

## Key Components Implemented

### Core Application Components

1. **App.tsx**
   - Main application component
   - Sets up Redux store and navigation

2. **AppNavigator.tsx**
   - Manages navigation between screens
   - Defines route configuration

3. **HomeScreen.tsx**
   - Landing screen with app information
   - "Start Practice" button to begin practice sessions

4. **PracticeScreen.tsx**
   - Main practice interface with prompt, timer, and PPP fields
   - Uses reusable components for better maintainability

### Reusable Components

1. **Timer.tsx**
   - 60-second countdown timer
   - Visual feedback with color changes
   - Start, pause, and reset controls

2. **PPPForm.tsx**
   - Input fields for Point, Proof, and Purpose
   - Provides structure for practice sessions

3. **PromptCard.tsx**
   - Displays random practice prompts
   - "New Prompt" button for generating new topics

4. **Button.tsx**
   - Platform-adaptive button component
   - Uses appropriate styling for Android and iOS

### Platform-Specific Components

1. **AndroidButton.tsx**
   - Android-specific button with Material Design styling
   - Uses TouchableNativeFeedback for native ripple effect

2. **IOSButton.tsx**
   - iOS-specific button with iOS styling conventions
   - Supports solid and outline button types

### State Management

1. **Redux Store**
   - Central state management using Redux Toolkit
   - Separate slices for different features

2. **promptSlice.ts**
   - Manages prompt state and actions
   - Handles loading, retrieving, and resetting prompts

3. **timerSlice.ts**
   - Manages timer state and actions
   - Controls timer start, pause, reset, and completion

### Custom Hooks

1. **useTimer.ts**
   - Custom React hook for timer functionality
   - Handles timer start, pause, reset, and completion callbacks

### Utility Functions

1. **helpers.ts**
   - Common utility functions used throughout the app
   - Includes time formatting, ID generation, text processing, etc.

### Theming and Styling

1. **theme.ts**
   - Theme configuration with colors, typography, spacing, etc.
   - Consistent styling across the application

### Constants

1. **appConstants.ts**
   - App-wide constants for consistent values
   - Timer defaults, storage keys, feature flags, etc.

## Platform-Specific Setup

### Android Setup

1. **Splash Screen**
   - Custom splash screen layout in XML
   - App logo and title display

2. **Resource Files**
   - Colors defined in colors.xml
   - String resources in strings.xml for localization
   - Material Design styling

### iOS Setup

1. **Native Styling**
   - iOS-specific components with native styling
   - Respects iOS design conventions

## Next Steps

1. **Implement Prompt Service**
   - Create a service for prompt generation and management
   - Add more prompts and categories

2. **Enhance UI/UX**
   - Improve visual design with animations and transitions
   - Add sound effects for timer events

3. **Add Local Storage**
   - Persist practice history and user preferences
   - Track progress over time

4. **Implement Future Enhancements**
   - Voice recording and playback
   - Metrics tracking and streak monitoring
   - Configurable reminders
   - Custom prompt packs

5. **Add Testing**
   - Unit tests for components and services
   - Integration tests for key user flows

## Development Guidelines

1. **Code Organization**
   - Maintain the established folder structure
   - Keep components small and focused

2. **Platform Adaptation**
   - Use platform-specific components when needed
   - Maintain consistent behavior across platforms

3. **State Management**
   - Use Redux for global state
   - Use local state for component-specific state

4. **Styling**
   - Follow the theme configuration
   - Maintain consistent spacing and typography

## Building and Running

To build and run the application:

1. **Install dependencies**
   ```
   npm install
   ```

2. **Run on Android**
   ```
   npm run android
   ```

3. **Run on iOS**
   ```
   npm run ios
   ```

This setup provides a solid foundation for developing the "Stay On Point" application for both Android and iOS platforms, following modern best practices and maintaining a clean, maintainable codebase.
