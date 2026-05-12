/**
 * NoteCard Component
 *
 * Renders a single note card with title, preview content, date, and category badge.
 * Uses Pressable for touch feedback. Adapts to dark/light theme.
 */

import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  useColorScheme,
  useWindowDimensions,
} from 'react-native';
import { Colors, Spacing, Typography, Radius } from '../constants/theme';
import type { Note } from '../constants/mockData';

interface NoteCardProps {
  note: Note;
  onPress?: () => void;
}

const categoryColors: Record<string, { bg: string; text: string }> = {
  Work: { bg: '#7C3AED20', text: '#7C3AED' },
  Personal: { bg: '#F59E0B20', text: '#F59E0B' },
  Learning: { bg: '#3B82F620', text: '#3B82F6' },
  Reading: { bg: '#10B98120', text: '#10B981' },
  Health: { bg: '#EF444420', text: '#EF4444' },
};

const categoryColorsDark: Record<string, { bg: string; text: string }> = {
  Work: { bg: '#A78BFA20', text: '#A78BFA' },
  Personal: { bg: '#FBBF2420', text: '#FBBF24' },
  Learning: { bg: '#60A5FA20', text: '#60A5FA' },
  Reading: { bg: '#34D39920', text: '#34D399' },
  Health: { bg: '#F8717120', text: '#F87171' },
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

export default function NoteCard({ note, onPress }: NoteCardProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = isDark ? Colors.dark : Colors.light;
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const catColors = isDark ? categoryColorsDark : categoryColors;
  const catColor = catColors[note.category] || catColors['Work'];

  // Use StyleSheet.compose to merge base card with conditional pinned style
  const cardStyle = StyleSheet.compose(
    styles.card,
    isDark ? styles.cardDark : styles.cardLight
  );

  const pinnedOverlay = note.pinned
    ? {
        borderLeftWidth: 3,
        borderLeftColor: colors.primary,
      }
    : null;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        cardStyle,
        pinnedOverlay,
        isTablet && styles.cardTablet,
        pressed && { opacity: 0.85, transform: [{ scale: 0.985 }] },
      ]}
    >
      {/* Header Row: Category + Date */}
      <View style={styles.headerRow}>
        <View style={[styles.categoryBadge, { backgroundColor: catColor.bg }]}>
          <Text style={[styles.categoryText, { color: catColor.text }]}>
            {note.category}
          </Text>
        </View>
        <Text style={[styles.dateText, { color: colors.textTertiary }]}>
          {formatDate(note.date)}
        </Text>
      </View>

      {/* Title */}
      <Text
        style={[styles.title, { color: colors.text }]}
        numberOfLines={1}
      >
        {note.pinned ? '📌 ' : ''}{note.title}
      </Text>

      {/* Content Preview */}
      <Text
        style={[styles.contentPreview, { color: colors.textSecondary }]}
        numberOfLines={2}
      >
        {note.content}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  cardLight: {
    backgroundColor: Colors.light.surface,
    shadowColor: Colors.light.cardShadow,
  },
  cardDark: {
    backgroundColor: Colors.dark.surface,
    shadowColor: Colors.dark.cardShadow,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  cardTablet: {
    padding: Spacing.xl,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  categoryBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.sm,
  },
  categoryText: {
    ...Typography.caption,
    fontWeight: '600',
  },
  dateText: {
    ...Typography.caption,
  },
  title: {
    ...Typography.bodyBold,
    fontSize: 16,
    marginBottom: Spacing.xs,
  },
  contentPreview: {
    ...Typography.body,
    fontSize: 13,
    lineHeight: 19,
  },
});
