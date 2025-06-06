import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface PPPFormProps {
  point: string;
  proof: string;
  purpose: string;
  onPointChange: (text: string) => void;
  onProofChange: (text: string) => void;
  onPurposeChange: (text: string) => void;
}

const PPPForm: React.FC<PPPFormProps> = ({
  point,
  proof,
  purpose,
  onPointChange,
  onProofChange,
  onPurposeChange,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>PPP Cheat-Sheet</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Point:</Text>
        <TextInput
          style={styles.input}
          value={point}
          onChangeText={onPointChange}
          placeholder="Your main point"
          multiline
        />
      </View>
      
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Proof:</Text>
        <TextInput
          style={styles.input}
          value={proof}
          onChangeText={onProofChange}
          placeholder="Supporting evidence"
          multiline
        />
      </View>
      
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Purpose:</Text>
        <TextInput
          style={styles.input}
          value={purpose}
          onChangeText={onPurposeChange}
          placeholder="Why it matters"
          multiline
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 24,
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
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#444',
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    color: '#333',
    minHeight: 80,
    textAlignVertical: 'top',
  },
});

export default PPPForm;
