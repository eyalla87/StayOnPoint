import React from 'react';
import { Platform } from 'react-native';
import AndroidButton from '../android/AndroidButton';
import IOSButton from '../ios/IOSButton';

interface ButtonProps {
  title: string;
  onPress: () => void;
  color?: string;
  disabled?: boolean;
  type?: 'solid' | 'outline'; // Only used for iOS
}

/**
 * Cross-platform button that uses the appropriate platform-specific button
 * Uses native styling for each platform for a more natural look and feel
 */
const Button: React.FC<ButtonProps> = (props) => {
  // Use platform-specific button based on the platform
  return Platform.OS === 'ios' ? <IOSButton {...props} /> : <AndroidButton {...props} />;
};

export default Button;
