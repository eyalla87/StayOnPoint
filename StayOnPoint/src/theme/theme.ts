// Theme configuration for the Stay On Point app
// This file contains color schemes, typography, spacing, etc.

export const colors = {
  primary: '#4a90e2',
  secondary: '#9b59b6',
  success: '#2ecc71',
  warning: '#e67e22',
  danger: '#e74c3c',
  info: '#3498db',
  light: '#f5f5f5',
  dark: '#333333',
  white: '#ffffff',
  black: '#000000',
  gray: {
    100: '#f9f9f9',
    200: '#f5f5f5',
    300: '#e5e5e5',
    400: '#cccccc',
    500: '#999999',
    600: '#666666',
    700: '#444444',
    800: '#333333',
    900: '#222222',
  },
  transparent: 'transparent',
};

export const typography = {
  fontFamily: {
    base: 'System',
    bold: 'System-Bold',
    medium: 'System-Medium',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    md: 18,
    lg: 20,
    xl: 24,
    xxl: 32,
    xxxl: 48,
  },
  lineHeight: {
    xs: 16,
    sm: 20,
    base: 24,
    md: 28,
    lg: 32,
    xl: 36,
    xxl: 40,
    xxxl: 56,
  },
  fontWeight: {
    light: '300',
    regular: '400',
    medium: '500',
    bold: '700',
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  base: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 48,
};

export const borderRadius = {
  xs: 4,
  sm: 6,
  base: 8,
  md: 10,
  lg: 16,
  xl: 24,
  xxl: 32,
  round: 9999,
};

export const shadow = {
  sm: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  base: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  lg: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
};

export default {
  colors,
  typography,
  spacing,
  borderRadius,
  shadow,
};
