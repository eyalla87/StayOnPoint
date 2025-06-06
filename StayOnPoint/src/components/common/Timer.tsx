import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface TimerProps {
  timeRemaining: number;
  isRunning: boolean;
  isComplete: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

const Timer: React.FC<TimerProps> = ({
  timeRemaining,
  isRunning,
  isComplete,
  onStart,
  onPause,
  onReset
}) => {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };

  return (
    <View style={styles.container}>
      <Text style={[
        styles.timerText,
        isComplete ? styles.timerComplete : 
        (timeRemaining < 10 ? styles.timerWarning : {})
      ]}>
        {formatTime(timeRemaining)}
      </Text>
      
      <View style={styles.timerButtons}>
        {!isRunning ? (
          <TouchableOpacity 
            style={[styles.button, styles.startButton]} 
            onPress={onStart}
            disabled={isComplete}
          >
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            style={[styles.button, styles.pauseButton]} 
            onPress={onPause}
          >
            <Text style={styles.buttonText}>Pause</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity 
          style={[styles.button, styles.resetButton]} 
          onPress={onReset}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  timerWarning: {
    color: '#e67e22',
  },
  timerComplete: {
    color: '#e74c3c',
  },
  timerButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    marginHorizontal: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  startButton: {
    backgroundColor: '#2ecc71',
  },
  pauseButton: {
    backgroundColor: '#3498db',
  },
  resetButton: {
    backgroundColor: '#95a5a6',
  },
});

export default Timer;
