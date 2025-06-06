import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface PromptCardProps {
  prompt: string;
  onNewPrompt: () => void;
}

const PromptCard: React.FC<PromptCardProps> = ({ prompt, onNewPrompt }) => {
  return (
    <View style={styles.container}>
      <View style={styles.promptContainer}>
        <Text style={styles.promptLabel}>Practice Prompt:</Text>
        <Text style={styles.promptText}>{prompt}</Text>
      </View>
      
      <TouchableOpacity 
        style={styles.newPromptButton} 
        onPress={onNewPrompt}
      >
        <Text style={styles.newPromptButtonText}>New Prompt</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  promptContainer: {
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
  promptLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#444',
  },
  promptText: {
    fontSize: 20,
    color: '#333',
    lineHeight: 28,
  },
  newPromptButton: {
    backgroundColor: '#9b59b6',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 30,
    alignItems: 'center',
  },
  newPromptButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PromptCard;
