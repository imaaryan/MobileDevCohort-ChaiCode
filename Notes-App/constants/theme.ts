/**
 * Theme constants for the Notes App
 * Provides dark and light mode color palettes, spacing, typography, and radius tokens.
 */

export const Colors = {
  light: {
    background: '#F5F3FF',
    surface: '#FFFFFF',
    surfaceAlt: '#EDE9FE',
    primary: '#7C3AED',
    primaryLight: '#A78BFA',
    primaryDark: '#5B21B6',
    text: '#1E1B4B',
    textSecondary: '#6B7280',
    textTertiary: '#9CA3AF',
    border: '#E5E7EB',
    borderFocused: '#7C3AED',
    danger: '#EF4444',
    success: '#10B981',
    searchBg: '#EDE9FE',
    cardShadow: 'rgba(124, 58, 237, 0.08)',
    overlay: 'rgba(0, 0, 0, 0.4)',
    switchTrackFalse: '#D1D5DB',
    switchTrackTrue: '#A78BFA',
    switchThumb: '#FFFFFF',
    headerOverlay: 'rgba(91, 33, 182, 0.55)',
  },
  dark: {
    background: '#0F0D1A',
    surface: '#1A1726',
    surfaceAlt: '#252136',
    primary: '#A78BFA',
    primaryLight: '#C4B5FD',
    primaryDark: '#7C3AED',
    text: '#F5F3FF',
    textSecondary: '#A1A1AA',
    textTertiary: '#71717A',
    border: '#2D2640',
    borderFocused: '#A78BFA',
    danger: '#F87171',
    success: '#34D399',
    searchBg: '#252136',
    cardShadow: 'rgba(0, 0, 0, 0.4)',
    overlay: 'rgba(0, 0, 0, 0.6)',
    switchTrackFalse: '#3F3F46',
    switchTrackTrue: '#7C3AED',
    switchThumb: '#F5F3FF',
    headerOverlay: 'rgba(15, 13, 26, 0.65)',
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
};

export const Typography = {
  heading: {
    fontSize: 28,
    fontWeight: '700' as const,
    letterSpacing: -0.5,
  },
  subheading: {
    fontSize: 20,
    fontWeight: '600' as const,
    letterSpacing: -0.3,
  },
  body: {
    fontSize: 15,
    fontWeight: '400' as const,
    lineHeight: 22,
  },
  bodyBold: {
    fontSize: 15,
    fontWeight: '600' as const,
    lineHeight: 22,
  },
  caption: {
    fontSize: 12,
    fontWeight: '500' as const,
    lineHeight: 16,
  },
  small: {
    fontSize: 11,
    fontWeight: '400' as const,
    lineHeight: 14,
  },
};

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 999,
};
