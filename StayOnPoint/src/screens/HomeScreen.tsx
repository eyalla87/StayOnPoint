import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { colors } from '../theme/theme';
import Button from '../components/common/Button';
import StreakCard from '../components/common/StreakCard';
import practiceHistoryService, { PracticeSession, StreakData } from '../services/practiceHistoryService';
import preferencesService from '../services/preferencesService';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [todaysSessions, setTodaysSessions] = useState<PracticeSession[]>([]);
  const [streakData, setStreakData] = useState<StreakData>({
    currentStreak: 0,
    longestStreak: 0,
    lastPracticeDate: '',
    sessionsToday: 0,
    totalSessions: 0
  });
  const [dailyGoal, setDailyGoal] = useState(3); // Default to 3 sessions per day

  useEffect(() => {
    // Load practice history and streak data
    loadData();
    
    // Get user preferences
    const preferences = preferencesService.getPreferences();
    setDailyGoal(preferences.streakGoal);
  }, []);

  const loadData = () => {
    // Get today's practice sessions
    const todaysPractice = practiceHistoryService.getTodaysPractice();
    setTodaysSessions(todaysPractice);
    
    // Get streak data
    const currentStreak = practiceHistoryService.getStreakData();
    setStreakData(currentStreak);
  };

  const startPractice = () => {
    navigation.navigate('Practice');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Stay On Point</Text>
        <Text style={styles.subtitle}>Speaking‑Focus Trainer</Text>
      </View>
      
      {/* Streak card for showing progress */}
      <StreakCard 
        streakData={streakData}
        dailyGoal={dailyGoal}
      />
      
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Practice delivering clear, concise messages using the PPP structure:
        </Text>
        <View style={styles.pppContainer}>
          <Text style={styles.pppItem}>1. <Text style={styles.bold}>Point</Text> – the core message</Text>
          <Text style={styles.pppItem}>2. <Text style={styles.bold}>Proof</Text> – one supporting example or fact</Text>
          <Text style={styles.pppItem}>3. <Text style={styles.bold}>Purpose</Text> – why it matters or what you need</Text>
        </View>
      </View>
      
      <View style={styles.buttonContainer}>
        <Button
          title="Start Practice"
          onPress={startPractice}
          color={colors.primary}
        />
      </View>
      
      <View style={styles.todayContainer}>
        <Text style={styles.sectionTitle}>Today's Progress</Text>
        <Text style={styles.progressText}>
          {todaysSessions.length === 0 
            ? "You haven't practiced yet today. Start now to keep your streak going!" 
            : `You've completed ${todaysSessions.filter((s: PracticeSession) => s.completed).length} of ${dailyGoal} practice sessions today.`
          }
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    color: '#666',
    textAlign: 'center',
  },
  infoContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 15,
    color: '#444',
    lineHeight: 22,
  },
  pppContainer: {
    marginLeft: 10,
  },
  pppItem: {
    fontSize: 16,
    marginBottom: 10,
    color: '#444',
    lineHeight: 22,
  },
  bold: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    padding: 20,
    alignItems: 'center',
  },
  todayContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    margin: 16,
    marginTop: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  progressText: {
    fontSize: 16,
    color: '#444',
    lineHeight: 22,
  },
});

export default HomeScreen;
