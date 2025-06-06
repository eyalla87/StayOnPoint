import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import PracticeHistory from '../components/common/PracticeHistory';
import StreakCard from '../components/common/StreakCard';
import practiceHistoryService, { PracticeSession, StreakData } from '../services/practiceHistoryService';
import preferencesService from '../services/preferencesService';
import { getCurrentDate } from '../utils/helpers';

const StatsScreen = () => {
  const [recentSessions, setRecentSessions] = useState<PracticeSession[]>([]);
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
    // Get today's date
    const today = getCurrentDate();
    
    // Get recent practice sessions (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const sevenDaysAgoStr = sevenDaysAgo.toISOString().split('T')[0];
    
    const recentHistory = practiceHistoryService.getPracticeHistory(sevenDaysAgoStr);
    setRecentSessions(recentHistory);
    
    // Get streak data
    const currentStreak = practiceHistoryService.getStreakData();
    setStreakData(currentStreak);
  };

  // Calculate some statistics
  const completedSessions = recentSessions.filter(session => session.completed);
  const completionRate = recentSessions.length > 0 
    ? Math.round((completedSessions.length / recentSessions.length) * 100) 
    : 0;
  
  const averageDuration = completedSessions.length > 0
    ? Math.round(completedSessions.reduce((total, session) => total + session.duration, 0) / completedSessions.length)
    : 0;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Practice Statistics</Text>
      </View>
      
      <StreakCard 
        streakData={streakData}
        dailyGoal={dailyGoal}
      />
      
      <View style={styles.statsGridContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{recentSessions.length}</Text>
          <Text style={styles.statLabel}>Sessions This Week</Text>
        </View>
        
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{`${completionRate}%`}</Text>
          <Text style={styles.statLabel}>Completion Rate</Text>
        </View>
        
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{averageDuration}</Text>
          <Text style={styles.statLabel}>Avg. Duration (sec)</Text>
        </View>
        
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{streakData.totalSessions}</Text>
          <Text style={styles.statLabel}>Total Sessions</Text>
        </View>
      </View>
      
      <View style={styles.historyContainer}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <PracticeHistory sessions={recentSessions} />
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
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  statsGridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
    marginTop: 8,
  },
  statBox: {
    width: '50%',
    padding: 8,
  },
  innerStatBox: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },
  historyContainer: {
    margin: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
});

export default StatsScreen;
