import { STORAGE_KEYS } from '../constants/appConstants';
import { generateId, getCurrentDate } from '../utils/helpers';
import { Prompt } from './promptService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface PracticeSession {
  id: string;
  prompt: Prompt;
  date: string; // YYYY-MM-DD format
  timestamp: number; // Unix timestamp
  duration: number; // in seconds
  completed: boolean;
  point?: string;
  proof?: string;
  purpose?: string;
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastPracticeDate: string; // YYYY-MM-DD format
  sessionsToday: number;
  totalSessions: number;
}

// In-memory storage (would use AsyncStorage in a real app)
let practiceHistory: PracticeSession[] = [];
let streakData: StreakData = {
  currentStreak: 0,
  longestStreak: 0,
  lastPracticeDate: '',
  sessionsToday: 0,
  totalSessions: 0
};

/**
 * Initialize practice history service
 * Loads saved data from AsyncStorage
 */
export const initPracticeHistory = async (): Promise<void> => {
  try {
    const savedHistory = await AsyncStorage.getItem(STORAGE_KEYS.PRACTICE_HISTORY);
    if (savedHistory) {
      practiceHistory = JSON.parse(savedHistory);
    }
    
    const savedStreak = await AsyncStorage.getItem(STORAGE_KEYS.STREAK_DATA);
    if (savedStreak) {
      streakData = JSON.parse(savedStreak);
    }
  } catch (error) {
    console.error('Failed to load practice history:', error);
  }
};

/**
 * Add a new practice session to history
 * @param {Omit<PracticeSession, 'id' | 'date' | 'timestamp'>} session Session details
 * @returns {PracticeSession} The newly created session
 */
export const addPracticeSession = (
  session: Omit<PracticeSession, 'id' | 'date' | 'timestamp'>
): PracticeSession => {
  const currentDate = getCurrentDate();
  
  const newSession: PracticeSession = {
    id: generateId(),
    date: currentDate,
    timestamp: Date.now(),
    ...session
  };
  
  practiceHistory.push(newSession);
  
  // Update streak data
  updateStreakData(currentDate, session.completed);
  
  // Save to AsyncStorage
  AsyncStorage.setItem(STORAGE_KEYS.PRACTICE_HISTORY, JSON.stringify(practiceHistory));
  AsyncStorage.setItem(STORAGE_KEYS.STREAK_DATA, JSON.stringify(streakData));
  
  return newSession;
};

/**
 * Update streak data based on a new practice session
 * @param {string} currentDate Today's date in YYYY-MM-DD format
 * @param {boolean} completed Whether the session was completed
 */
const updateStreakData = (currentDate: string, completed: boolean): void => {
  if (!completed) return;
  
  const { lastPracticeDate } = streakData;
  
  // Update total sessions
  streakData.totalSessions++;
  
  // Same day - update sessions today
  if (currentDate === lastPracticeDate) {
    streakData.sessionsToday++;
  } else {
    // New day
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = getCurrentDate();
    
    // Check if yesterday was the last practice day
    if (lastPracticeDate === yesterdayStr) {
      // Continued streak
      streakData.currentStreak++;
    } else if (lastPracticeDate !== '') {
      // Broken streak - reset
      streakData.currentStreak = 1;
    } else {
      // First session ever
      streakData.currentStreak = 1;
    }
    
    // Update longest streak if needed
    if (streakData.currentStreak > streakData.longestStreak) {
      streakData.longestStreak = streakData.currentStreak;
    }
    
    // Reset sessions today counter for new day
    streakData.sessionsToday = 1;
  }
  
  // Update last practice date
  streakData.lastPracticeDate = currentDate;
};

/**
 * Get practice history for a date range
 * @param {string} [startDate] Optional start date (YYYY-MM-DD)
 * @param {string} [endDate] Optional end date (YYYY-MM-DD)
 * @returns {PracticeSession[]} Filtered practice sessions
 */
export const getPracticeHistory = (
  startDate?: string,
  endDate?: string
): PracticeSession[] => {
  let filteredHistory = [...practiceHistory];
  
  if (startDate) {
    filteredHistory = filteredHistory.filter(session => session.date >= startDate);
  }
  
  if (endDate) {
    filteredHistory = filteredHistory.filter(session => session.date <= endDate);
  }
  
  // Sort by timestamp (newest first)
  return filteredHistory.sort((a, b) => b.timestamp - a.timestamp);
};

/**
 * Get today's practice sessions
 * @returns {PracticeSession[]} Today's practice sessions
 */
export const getTodaysPractice = (): PracticeSession[] => {
  const today = getCurrentDate();
  return practiceHistory.filter(session => session.date === today);
};

/**
 * Get current streak data
 * @returns {StreakData} The current streak data
 */
export const getStreakData = (): StreakData => {
  return { ...streakData };
};

/**
 * Clear all practice history
 * For testing or user account reset purposes
 */
export const clearPracticeHistory = (): void => {
  practiceHistory = [];
  streakData = {
    currentStreak: 0,
    longestStreak: 0,
    lastPracticeDate: '',
    sessionsToday: 0,
    totalSessions: 0
  };
  
  // In a real app, clear from AsyncStorage
  // AsyncStorage.removeItem(STORAGE_KEYS.PRACTICE_HISTORY);
  // AsyncStorage.removeItem(STORAGE_KEYS.STREAK_DATA);
};

export default {
  initPracticeHistory,
  addPracticeSession,
  getPracticeHistory,
  getTodaysPractice,
  getStreakData,
  clearPracticeHistory
};
