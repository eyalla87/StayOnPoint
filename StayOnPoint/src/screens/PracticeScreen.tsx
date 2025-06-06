import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { resetTimer } from '../store/slices/timerSlice';

// Import components
import Timer from '../components/common/Timer';
import PPPForm from '../components/common/PPPForm';
import PromptCard from '../components/common/PromptCard';

// Import services and hooks
import promptService, { Prompt } from '../services/promptService';
import useTimer from '../hooks/useTimer';

const PracticeScreen = () => {
  const dispatch = useDispatch();
  const { time, isRunning, isComplete, start, pause, reset } = useTimer({
    onComplete: () => {
      // Could trigger sound or vibration when timer completes
      console.log('Timer completed!');
    }
  });

  const [currentPrompt, setCurrentPrompt] = useState<Prompt | null>(null);
  const [point, setPoint] = useState<string>('');
  const [proof, setProof] = useState<string>('');
  const [purpose, setPurpose] = useState<string>('');

  useEffect(() => {
    getNewPrompt();
  }, []);

  const getNewPrompt = () => {
    const prompt = promptService.getRandomPrompt();
    setCurrentPrompt(prompt);
    setPoint('');
    setProof('');
    setPurpose('');
    reset();
    dispatch(resetTimer()); // Keep Redux state in sync
  };

  const handleResetSession = () => {
    reset();
    dispatch(resetTimer());
    setPoint('');
    setProof('');
    setPurpose('');
  };

  return (
    <ScrollView style={styles.container}>
      <PromptCard 
        prompt={currentPrompt?.text || 'Loading prompt...'}
        onNewPrompt={getNewPrompt}
      />

      <Timer 
        timeRemaining={time}
        isRunning={isRunning}
        isComplete={isComplete}
        onStart={start}
        onPause={pause}
        onReset={reset}
      />

      <PPPForm
        point={point}
        proof={proof}
        purpose={purpose}
        onPointChange={setPoint}
        onProofChange={setProof}
        onPurposeChange={setPurpose}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  }
});

export default PracticeScreen;
