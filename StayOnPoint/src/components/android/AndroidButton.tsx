import React from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';

interface AndroidButtonProps {
  title: string;
  onPress: () => void;
  color?: string;
  disabled?: boolean;
}

/**
 * Android-specific button component using TouchableNativeFeedback for native ripple effect
 */
const AndroidButton: React.FC<AndroidButtonProps> = ({ 
  title, 
  onPress, 
  color = '#4a90e2', 
  disabled = false 
}) => {
  return (
    <TouchableNativeFeedback
      onPress={onPress}
      background={TouchableNativeFeedback.Ripple('#ffffff', false)}
      disabled={disabled}
    >
      <View style={[
        styles.button, 
        { backgroundColor: disabled ? '#cccccc' : color }
      ]}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    minWidth: 100,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

export default AndroidButton;
