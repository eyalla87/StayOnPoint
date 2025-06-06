import { STORAGE_KEYS } from '../constants/appConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UserPreferences {
  timerDuration: number;
  enableSounds: boolean;
  enableVibration: boolean;
  selectedPromptCategories: string[];
  darkMode: boolean;
  reminderEnabled: boolean;
  reminderTime: string; // format: 'HH:MM'
  streakGoal: number;
}

// Default preferences
const defaultPreferences: UserPreferences = {
  timerDuration: 60, // 60 seconds
  enableSounds: true,
  enableVibration: true,
  selectedPromptCategories: ['professional', 'personal', 'leadership', 'creativity', 'communication'],
  darkMode: false,
  reminderEnabled: false,
  reminderTime: '18:00', // 6:00 PM
  streakGoal: 3 // sessions per day
};

// In-memory storage for preferences (would use AsyncStorage in real app)
let userPreferences: UserPreferences = { ...defaultPreferences };

/**
 * Initialize user preferences service
 * In a real app, this would load from AsyncStorage
 */
export const initPreferences = async (): Promise<void> => {
  try {
    // In a real implementation:
    // const savedPrefs = await AsyncStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
    // if (savedPrefs) {
    //   userPreferences = { ...defaultPreferences, ...JSON.parse(savedPrefs) };
    // }
  } catch (error) {
    console.error('Failed to load user preferences:', error);
  }
};

/**
 * Get all user preferences
 * @returns {UserPreferences} The current user preferences
 */
export const getPreferences = (): UserPreferences => {
  return { ...userPreferences };
};

/**
 * Update user preferences
 * @param {Partial<UserPreferences>} newPreferences Updated preferences
 * @returns {UserPreferences} The updated preferences
 */
export const updatePreferences = (newPreferences: Partial<UserPreferences>): UserPreferences => {
  userPreferences = { ...userPreferences, ...newPreferences };
  
  // In a real app, save to AsyncStorage
  // AsyncStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(userPreferences));
  
  return { ...userPreferences };
};

/**
 * Reset preferences to default
 * @returns {UserPreferences} The default preferences
 */
export const resetPreferences = (): UserPreferences => {
  userPreferences = { ...defaultPreferences };
  
  // In a real app, save to AsyncStorage
  // AsyncStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(userPreferences));
  
  return { ...userPreferences };
};

export default {
  initPreferences,
  getPreferences,
  updatePreferences,
  resetPreferences
};
