import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { PracticeSession } from '../../services/practiceHistoryService';

interface PracticeHistoryProps {
  sessions: PracticeSession[];
  emptyMessage?: string;
}

interface PracticeSessionItemProps {
  session: PracticeSession;
}

const PracticeSessionItem: React.FC<PracticeSessionItemProps> = ({ session }) => {
  // Format the timestamp to a readable time
  const formatTime = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <View style={styles.sessionItem}>
      <View style={styles.sessionHeader}>
        <Text style={styles.promptText} numberOfLines={2}>{session.prompt.text}</Text>
        <Text style={styles.timeText}>{formatTime(session.timestamp)}</Text>
      </View>

      <View style={styles.sessionDetails}>
        <View style={styles.statusContainer}>
          <Text style={styles.statusLabel}>Status:</Text>
          <Text 
            style={[
              styles.statusValue, 
              session.completed ? styles.statusCompleted : styles.statusIncomplete
            ]}
          >
            {session.completed ? 'Completed' : 'Incomplete'}
          </Text>
        </View>
        
        <View style={styles.durationContainer}>
          <Text style={styles.durationLabel}>Duration:</Text>
          <Text style={styles.durationValue}>{session.duration}s</Text>
        </View>
      </View>
      
      {session.point && (
        <View style={styles.pppItem}>
          <Text style={styles.pppLabel}>Point:</Text>
          <Text style={styles.pppText} numberOfLines={2}>{session.point}</Text>
        </View>
      )}
      
      {session.proof && (
        <View style={styles.pppItem}>
          <Text style={styles.pppLabel}>Proof:</Text>
          <Text style={styles.pppText} numberOfLines={2}>{session.proof}</Text>
        </View>
      )}
      
      {session.purpose && (
        <View style={styles.pppItem}>
          <Text style={styles.pppLabel}>Purpose:</Text>
          <Text style={styles.pppText} numberOfLines={2}>{session.purpose}</Text>
        </View>
      )}
    </View>
  );
};

const PracticeHistory: React.FC<PracticeHistoryProps> = ({ 
  sessions, 
  emptyMessage = "No practice sessions yet. Start practicing to see your history!" 
}) => {
  if (sessions.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>{emptyMessage}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={sessions}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PracticeSessionItem session={item} />}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  sessionItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  promptText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 8,
  },
  timeText: {
    fontSize: 14,
    color: '#666',
  },
  sessionDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusLabel: {
    fontSize: 14,
    color: '#666',
    marginRight: 4,
  },
  statusValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  statusCompleted: {
    color: '#2ecc71',
  },
  statusIncomplete: {
    color: '#e74c3c',
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationLabel: {
    fontSize: 14,
    color: '#666',
    marginRight: 4,
  },
  durationValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  pppItem: {
    marginBottom: 8,
  },
  pppLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  pppText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default PracticeHistory;
