import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Switch, 
  TouchableOpacity,
  Platform 
} from 'react-native';
import preferencesService, { UserPreferences } from '../services/preferencesService';
import { PromptCategory } from '../services/promptService';
import Slider from '@react-native-community/slider';
import { colors } from '../theme/theme';
import Button from '../components/common/Button';

const SettingsScreen = () => {
  const [preferences, setPreferences] = useState<UserPreferences>({
    timerDuration: 60,
    enableSounds: true,
    enableVibration: true,
    selectedPromptCategories: Object.values(PromptCategory),
    darkMode: false,
    reminderEnabled: false,
    reminderTime: '18:00',
    streakGoal: 3
  });
  
  const [timerSliderValue, setTimerSliderValue] = useState(60);
  const [streakSliderValue, setStreakSliderValue] = useState(3);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    // Load preferences
    const userPrefs = preferencesService.getPreferences();
    setPreferences(userPrefs);
    setTimerSliderValue(userPrefs.timerDuration);
    setStreakSliderValue(userPrefs.streakGoal);
  }, []);

  const handleToggleSwitch = (key: keyof UserPreferences) => {
    if (typeof preferences[key] === 'boolean') {
      const newPreferences = {
        ...preferences,
        [key]: !preferences[key as keyof UserPreferences]
      };
      setPreferences(newPreferences);
      setHasChanges(true);
    }
  };

  const handleTimerDurationChange = (value: number) => {
    setTimerSliderValue(value);
  };
  
  const handleTimerDurationComplete = (value: number) => {
    const newPreferences = {
      ...preferences,
      timerDuration: value
    };
    setPreferences(newPreferences);
    setHasChanges(true);
  };
  
  const handleStreakGoalChange = (value: number) => {
    setStreakSliderValue(value);
  };
  
  const handleStreakGoalComplete = (value: number) => {
    const newPreferences = {
      ...preferences,
      streakGoal: value
    };
    setPreferences(newPreferences);
    setHasChanges(true);
  };
  
  const handleToggleCategory = (category: string) => {
    const currentCategories = [...preferences.selectedPromptCategories];
    const newCategories = currentCategories.includes(category)
      ? currentCategories.filter(cat => cat !== category)
      : [...currentCategories, category];
      
    // Ensure at least one category is selected
    if (newCategories.length === 0) return;
    
    const newPreferences = {
      ...preferences,
      selectedPromptCategories: newCategories
    };
    setPreferences(newPreferences);
    setHasChanges(true);
  };
  
  const handleSavePreferences = () => {
    preferencesService.updatePreferences(preferences);
    setHasChanges(false);
  };
  
  const handleResetPreferences = () => {
    const defaultPrefs = preferencesService.resetPreferences();
    setPreferences(defaultPrefs);
    setTimerSliderValue(defaultPrefs.timerDuration);
    setStreakSliderValue(defaultPrefs.streakGoal);
    setHasChanges(false);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Timer Settings</Text>
        
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Timer Duration</Text>
          <Text style={styles.settingValue}>{timerSliderValue} seconds</Text>
        </View>
        
        <Slider
          style={styles.slider}
          value={timerSliderValue}
          minimumValue={30}
          maximumValue={120}
          step={10}
          minimumTrackTintColor={colors.primary}
          maximumTrackTintColor="#d3d3d3"
          thumbTintColor={colors.primary}
          onValueChange={handleTimerDurationChange}
          onSlidingComplete={handleTimerDurationComplete}
        />
        
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Enable Sounds</Text>
          <Switch
            value={preferences.enableSounds}
            onValueChange={() => handleToggleSwitch('enableSounds')}
            trackColor={{ false: '#d3d3d3', true: colors.primary }}
            thumbColor={Platform.OS === 'ios' ? '#fff' : preferences.enableSounds ? colors.primary : '#f4f3f4'}
          />
        </View>
        
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Enable Vibration</Text>
          <Switch
            value={preferences.enableVibration}
            onValueChange={() => handleToggleSwitch('enableVibration')}
            trackColor={{ false: '#d3d3d3', true: colors.primary }}
            thumbColor={Platform.OS === 'ios' ? '#fff' : preferences.enableVibration ? colors.primary : '#f4f3f4'}
          />
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Prompts Categories</Text>
        <Text style={styles.sectionDescription}>
          Select which categories of prompts you want to practice with.
        </Text>
        
        {Object.values(PromptCategory).map((category) => (
          <TouchableOpacity
            key={category}
            style={styles.categoryItem}
            onPress={() => handleToggleCategory(category)}
          >
            <Text style={styles.categoryLabel}>{category.charAt(0).toUpperCase() + category.slice(1)}</Text>
            <View 
              style={[
                styles.checkbox, 
                preferences.selectedPromptCategories.includes(category) && styles.checkboxSelected
              ]} 
            />
          </TouchableOpacity>
        ))}
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Streak Goals</Text>
        
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Daily Practice Goal</Text>
          <Text style={styles.settingValue}>{streakSliderValue} sessions</Text>
        </View>
        
        <Slider
          style={styles.slider}
          value={streakSliderValue}
          minimumValue={1}
          maximumValue={10}
          step={1}
          minimumTrackTintColor={colors.primary}
          maximumTrackTintColor="#d3d3d3"
          thumbTintColor={colors.primary}
          onValueChange={handleStreakGoalChange}
          onSlidingComplete={handleStreakGoalComplete}
        />
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Settings</Text>
        
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Dark Mode</Text>
          <Switch
            value={preferences.darkMode}
            onValueChange={() => handleToggleSwitch('darkMode')}
            trackColor={{ false: '#d3d3d3', true: colors.primary }}
            thumbColor={Platform.OS === 'ios' ? '#fff' : preferences.darkMode ? colors.primary : '#f4f3f4'}
          />
        </View>
        
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Daily Reminder</Text>
          <Switch
            value={preferences.reminderEnabled}
            onValueChange={() => handleToggleSwitch('reminderEnabled')}
            trackColor={{ false: '#d3d3d3', true: colors.primary }}
            thumbColor={Platform.OS === 'ios' ? '#fff' : preferences.reminderEnabled ? colors.primary : '#f4f3f4'}
          />
        </View>
        
        {preferences.reminderEnabled && (
          <Text style={styles.reminderNote}>
            Reminder time setting will be available in future updates.
          </Text>
        )}
      </View>
      
      <View style={styles.buttonsContainer}>
        {hasChanges && (
          <Button 
            title="Save Changes"
            onPress={handleSavePreferences}
            color={colors.primary}
          />
        )}
        
        <Button 
          title="Reset to Default"
          onPress={handleResetPreferences}
          color={colors.gray[600]}
          type="outline"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    margin: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
  },
  settingValue: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '500',
  },
  slider: {
    width: '100%',
    height: 40,
    marginVertical: 8,
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  categoryLabel: {
    fontSize: 16,
    color: '#333',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#d3d3d3',
  },
  checkboxSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  reminderNote: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 8,
  },
  buttonsContainer: {
    margin: 16,
    marginTop: 8,
  },
});

export default SettingsScreen;
