# Stay On Point - React Native App

A React Native mobile application for Android and iOS that helps users practice delivering clear, concise messages using the PPP (Point-Proof-Purpose) structure with a 60-second timer and practice tracking features.

## Features

### Core Functionality
- **PPP Structure Practice**: Guided practice using Point-Proof-Purpose framework
- **60-Second Timer**: Built-in countdown timer to encourage conciseness
- **Practice Tracking**: Track daily sessions and maintain streaks
- **Prompt Categories**: Multiple categories (Professional, Personal, Leadership, Creativity, Communication)
- **Progress Analytics**: View practice history and statistics

### Technical Features
- **Cross-Platform**: Native iOS and Android support
- **Offline Storage**: Local data persistence with AsyncStorage
- **Redux State Management**: Centralized state for timer and prompts
- **TypeScript**: Full type safety throughout the codebase
- **Modern UI**: Clean, intuitive interface with platform-specific components

## Installation & Setup

### Prerequisites
- Node.js (>=16)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Metro Bundler**
   ```bash
   npm start
   ```

3. **Run on Android**
   ```bash
   npm run android
   ```

4. **Run on iOS** (macOS only)
   ```bash
   npm run ios
   ```

## Technologies Used

- **React Native 0.73** - Cross-platform mobile framework
- **TypeScript** - Type-safe JavaScript
- **Redux Toolkit** - State management
- **React Navigation 6** - Navigation library
- **AsyncStorage** - Local data persistence
- **Vector Icons** - Icon library

## App Structure

The app consists of four main screens:
- **Home**: Dashboard with daily goals and streak tracking
- **Practice**: Main practice interface with timer and PPP form
- **Stats**: Analytics and practice history
- **Settings**: User preferences and configuration

## Development

To test the app, run the Metro bundler:
```bash
npm start
```

Then run on your preferred platform:
- Android: `npm run android`
- iOS: `npm run ios` (macOS only)