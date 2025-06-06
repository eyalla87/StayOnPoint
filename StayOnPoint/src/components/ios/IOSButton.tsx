import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface IOSButtonProps {
  title: string;
  onPress: () => void;
  color?: string;
  disabled?: boolean;
  type?: 'solid' | 'outline';
}

/**
 * iOS-specific button component with iOS styling conventions
 */
const IOSButton: React.FC<IOSButtonProps> = ({ 
  title, 
  onPress, 
  color = '#007aff', // iOS blue
  disabled = false,
  type = 'solid'
}) => {
  const buttonStyles = [
    styles.button,
    type === 'outline' ? styles.outlineButton : {},
    type === 'outline' 
      ? { borderColor: disabled ? '#cccccc' : color } 
      : { backgroundColor: disabled ? '#cccccc' : color },
  ];
  
  const textStyles = [
    styles.text,
    type === 'outline' 
      ? { color: disabled ? '#cccccc' : color } 
      : styles.solidText,
    disabled ? styles.disabledText : {},
  ];
  
  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={textStyles}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  solidText: {
    color: 'white',
  },
  disabledText: {
    opacity: 0.5,
  }
});

export default IOSButton;
