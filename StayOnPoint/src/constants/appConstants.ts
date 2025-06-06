// App-wide constants for Stay On Point

export const APP_NAME = 'Stay On Point';
export const APP_VERSION = '1.0.0';

// Timer constants
export const DEFAULT_TIMER_SECONDS = 60; // 60-second timer as per requirements
export const TIMER_WARNING_THRESHOLD = 10; // When to show warning color (10 seconds left)

// Storage keys
export const STORAGE_KEYS = {
  USER_PREFERENCES: 'user_preferences',
  PRACTICE_HISTORY: 'practice_history',
  CUSTOM_PROMPTS: 'custom_prompts',
  STREAK_DATA: 'streak_data',
};

// Animation durations
export const ANIMATION = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
};

// API endpoints (for future implementation)
export const API = {
  BASE_URL: 'https://api.stayonpoint.app',
  ENDPOINTS: {
    PROMPTS: '/prompts',
    USER: '/user',
    STATS: '/stats',
  },
};

// Feature flags
export const FEATURES = {
  VOICE_RECORDING: false, // Future enhancement
  METRICS_TRACKING: false, // Future enhancement
  CUSTOM_PROMPT_PACKS: false, // Future enhancement
  REMINDERS: false, // Future enhancement
};

export default {
  APP_NAME,
  APP_VERSION,
  DEFAULT_TIMER_SECONDS,
  TIMER_WARNING_THRESHOLD,
  STORAGE_KEYS,
  ANIMATION,
  API,
  FEATURES,
};
