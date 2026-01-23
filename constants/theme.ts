/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

// Modern Agriculture-themed colors with gradients
const primaryGreen = '#4CAF50';
const darkGreen = '#2E7D32';
const lightGreen = '#81C784';

export const Colors = {
  light: {
    text: '#1B5E20',
    background: '#F1F8E9',
    tint: primaryGreen,
    icon: '#4CAF50',
    tabIconDefault: '#81C784',
    tabIconSelected: primaryGreen,
    primary: primaryGreen,
    secondary: lightGreen,
    accent: '#FF9800',
    surface: '#FFFFFF',
    border: '#C8E6C9',
  },
  dark: {
    text: '#C8E6C9',
    background: '#1B5E20',
    tint: lightGreen,
    icon: '#81C784',
    tabIconDefault: '#4CAF50',
    tabIconSelected: lightGreen,
    primary: lightGreen,
    secondary: primaryGreen,
    accent: '#FFB74D',
    surface: '#2E7D32',
    border: '#4CAF50',
  },
};

// Beautiful gradient combinations for CropAI
export const Gradients = {
  // Primary gradients
  primary: ['#4CAF50', '#66BB6A'], // Fresh green
  primaryDark: ['#2E7D32', '#388E3C'], // Deep forest
  
  // Nature-inspired gradients
  sunrise: ['#FF9800', '#FFC107'], // Golden sunrise
  sunset: ['#FF7043', '#FF9800'], // Warm sunset
  forest: ['#2E7D32', '#4CAF50', '#81C784'], // Forest depth
  meadow: ['#8BC34A', '#CDDC39'], // Fresh meadow
  
  // Modern UI gradients
  success: ['#4CAF50', '#8BC34A'], // Success states
  warning: ['#FF9800', '#FFC107'], // Warning states
  info: ['#2196F3', '#03DAC6'], // Info states
  
  // Sophisticated gradients
  emerald: ['#00C851', '#007E33'], // Rich emerald
  sage: ['#87A96B', '#A8C68F'], // Sage green
  mint: ['#00D4AA', '#00B894'], // Fresh mint
  
  // Background gradients
  lightBg: ['#F1F8E9', '#E8F5E8'], // Light background
  darkBg: ['#1B5E20', '#2E7D32'], // Dark background
  
  // Special effects
  shimmer: ['#FFFFFF', '#F5F5F5', '#FFFFFF'], // Loading shimmer
  glow: ['#4CAF50', '#81C784', '#4CAF50'], // Glowing effect
};

// Gradient directions for React Native
export const GradientDirections = {
  vertical: { start: { x: 0, y: 0 }, end: { x: 0, y: 1 } },
  horizontal: { start: { x: 0, y: 0 }, end: { x: 1, y: 0 } },
  diagonal: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
  radial: { start: { x: 0.5, y: 0.5 }, end: { x: 1, y: 1 } },
};

// Shadow presets for depth
export const Shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
