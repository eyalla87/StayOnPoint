// A service for managing speaking prompts
import { generateId } from '../utils/helpers';
import { STORAGE_KEYS } from '../constants/appConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Interface for prompts with IDs and categories
export interface Prompt {
  id: string;
  text: string;
  category: PromptCategory;
}

// Available prompt categories
export enum PromptCategory {
  PROFESSIONAL = 'professional',
  PERSONAL = 'personal',
  LEADERSHIP = 'leadership',
  CREATIVITY = 'creativity',
  COMMUNICATION = 'communication',
  CUSTOM = 'custom',
}

// Mock data for prompts organized by category
const defaultPrompts: Prompt[] = [
  // Professional prompts
  { id: generateId(), text: "Explain why setting clear goals is important", category: PromptCategory.PROFESSIONAL },
  { id: generateId(), text: "Describe your favorite productivity tool", category: PromptCategory.PROFESSIONAL },
  { id: generateId(), text: "Share a strategy for managing stress at work", category: PromptCategory.PROFESSIONAL },
  { id: generateId(), text: "Explain how to prioritize tasks effectively", category: PromptCategory.PROFESSIONAL },
  { id: generateId(), text: "Describe an effective meeting structure", category: PromptCategory.PROFESSIONAL },
  
  // Personal growth prompts
  { id: generateId(), text: "Explain the benefits of regular exercise", category: PromptCategory.PERSONAL },
  { id: generateId(), text: "Describe a book that changed your perspective", category: PromptCategory.PERSONAL },
  { id: generateId(), text: "Share how you maintain work-life balance", category: PromptCategory.PERSONAL },
  { id: generateId(), text: "Explain the importance of continuous learning", category: PromptCategory.PERSONAL },
  { id: generateId(), text: "Describe a personal goal and your plan to achieve it", category: PromptCategory.PERSONAL },
  
  // Leadership prompts
  { id: generateId(), text: "Describe a time when teamwork led to a successful outcome", category: PromptCategory.LEADERSHIP },
  { id: generateId(), text: "Explain why diversity in teams is beneficial", category: PromptCategory.LEADERSHIP },
  { id: generateId(), text: "Explain what makes a good leader", category: PromptCategory.LEADERSHIP },
  { id: generateId(), text: "Share how you motivate team members", category: PromptCategory.LEADERSHIP },
  { id: generateId(), text: "Describe how to delegate tasks effectively", category: PromptCategory.LEADERSHIP },
  
  // Creativity prompts
  { id: generateId(), text: "Describe an innovative solution to a common problem", category: PromptCategory.CREATIVITY },
  { id: generateId(), text: "Share how you overcome creative blocks", category: PromptCategory.CREATIVITY },
  { id: generateId(), text: "Describe a technology trend you're excited about", category: PromptCategory.CREATIVITY },
  { id: generateId(), text: "Explain how to foster innovation in a team", category: PromptCategory.CREATIVITY },
  { id: generateId(), text: "Describe your approach to problem-solving", category: PromptCategory.CREATIVITY },
  
  // Communication prompts
  { id: generateId(), text: "Share a technique for effective communication", category: PromptCategory.COMMUNICATION },
  { id: generateId(), text: "Share a valuable lesson you learned from failure", category: PromptCategory.COMMUNICATION },
  { id: generateId(), text: "Share a method for making difficult decisions", category: PromptCategory.COMMUNICATION },
  { id: generateId(), text: "Explain how to give constructive feedback", category: PromptCategory.COMMUNICATION },
  { id: generateId(), text: "Describe a situation where you had to adapt your communication style", category: PromptCategory.COMMUNICATION },
];

// In-memory storage for custom prompts (would be AsyncStorage in a real app)
let customPrompts: Prompt[] = [];

/**
 * Get a random prompt from the available prompts
 * @param {PromptCategory} [category] Optional category filter
 * @returns {Prompt} A random prompt object
 */
export const getRandomPrompt = (category?: PromptCategory): Prompt => {
  let availablePrompts = [...defaultPrompts, ...customPrompts];
  
  if (category) {
    availablePrompts = availablePrompts.filter(prompt => prompt.category === category);
    
    // Fall back to all prompts if none match the category
    if (availablePrompts.length === 0) {
      availablePrompts = [...defaultPrompts, ...customPrompts];
    }
  }
  
  const randomIndex = Math.floor(Math.random() * availablePrompts.length);
  return availablePrompts[randomIndex];
};

/**
 * Get prompts by category
 * @param {PromptCategory} category The category to filter by
 * @returns {Prompt[]} Array of prompts in the category
 */
export const getPromptsByCategory = (category: PromptCategory): Prompt[] => {
  const allPrompts = [...defaultPrompts, ...customPrompts];
  return allPrompts.filter(prompt => prompt.category === category);
};

/**
 * Get all available prompts
 * @returns {Prompt[]} Array of all prompt objects
 */
export const getAllPrompts = (): Prompt[] => {
  return [...defaultPrompts, ...customPrompts];
};

/**
 * Add a custom prompt to the list
 * @param {string} text The prompt text to add
 * @param {PromptCategory} [category=PromptCategory.CUSTOM] The category for the prompt
 * @returns {Prompt} The newly created prompt
 */
export const addCustomPrompt = (
  text: string, 
  category: PromptCategory = PromptCategory.CUSTOM
): Prompt => {
  const newPrompt: Prompt = {
    id: generateId(),
    text,
    category
  };
  
  customPrompts.push(newPrompt);
  
  // Save to AsyncStorage
  AsyncStorage.setItem(STORAGE_KEYS.CUSTOM_PROMPTS, JSON.stringify(customPrompts));
  
  return newPrompt;
};

/**
 * Search for prompts matching a query string
 * @param {string} query The search query
 * @returns {Prompt[]} Array of matching prompts
 */
export const searchPrompts = (query: string): Prompt[] => {
  const allPrompts = [...defaultPrompts, ...customPrompts];
  const lowerQuery = query.toLowerCase();
  
  return allPrompts.filter(prompt => 
    prompt.text.toLowerCase().includes(lowerQuery)
  );
};

/**
 * Initialize the prompt service, loading any saved custom prompts
 * In a real app, this would load from AsyncStorage
 */
export const initPromptService = async (): Promise<void> => {
  try {
    const savedPrompts = await AsyncStorage.getItem(STORAGE_KEYS.CUSTOM_PROMPTS);
    if (savedPrompts) {
      customPrompts = JSON.parse(savedPrompts);
    }
  } catch (error) {
    // Using a placeholder for console in React Native environment
    if (typeof console !== 'undefined') {
      console.error('Failed to load custom prompts:', error);
    }
  }
};

/**
 * Delete a custom prompt
 * @param {string} id The ID of the prompt to delete
 * @returns {boolean} Success status
 */
export const deleteCustomPrompt = (id: string): boolean => {
  const initialLength = customPrompts.length;
  customPrompts = customPrompts.filter(prompt => prompt.id !== id);
  
  const success = customPrompts.length < initialLength;
  
  // In a real app, save the updated list
  // if (success) {
  //   AsyncStorage.setItem(STORAGE_KEYS.CUSTOM_PROMPTS, JSON.stringify(customPrompts));
  // }
  
  return success;
};

export default {
  getRandomPrompt,
  getAllPrompts,
  getPromptsByCategory,
  addCustomPrompt,
  searchPrompts,
  initPromptService,
  deleteCustomPrompt,
  PromptCategory
};
