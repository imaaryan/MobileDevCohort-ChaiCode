/**
 * Note Editor Screen
 *
 * A screen for creating/editing a note with:
 * - ImageBackground in the header section
 * - TextInput for title and multiline body
 * - KeyboardAvoidingView to prevent keyboard overlap
 * - Back and Save buttons using Pressable
 *
 * Uses:
 * - useColorScheme() for theme detection
 * - useWindowDimensions() for responsive layouts
 * - StyleSheet.create(), StyleSheet.flatten()
 */

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  useColorScheme,
  useWindowDimensions,
  StatusBar,
} from 'react-native';
import { Colors, Spacing, Typography, Radius } from '../constants/theme';

const HEADER_IMAGE = require('../assets/images/editor-header-bg.png');

export default function NoteEditorScreen() {
  const systemScheme = useColorScheme();
  const isDark = systemScheme === 'dark';
  const colors = isDark ? Colors.dark : Colors.light;
  const { width, height } = useWindowDimensions();
  const isTablet = width >= 768;

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const [isBodyFocused, setIsBodyFocused] = useState(false);
  const bodyRef = useRef<TextInput>(null);

  const wordCount = body.trim() ? body.trim().split(/\s+/).length : 0;
  const charCount = body.length;

  // Use StyleSheet.flatten for demonstration — flatten title input styles
  const titleInputStyle = StyleSheet.flatten([
    styles.titleInput,
    { color: colors.text, borderBottomColor: isTitleFocused ? colors.borderFocused : colors.border },
  ]);

  const bodyInputStyle = StyleSheet.flatten([
    styles.bodyInput,
    {
      color: colors.text,
      minHeight: isTablet ? 400 : 280,
    },
  ]);

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <StatusBar barStyle="light-content" />

      {/* Header with ImageBackground */}
      <ImageBackground
        source={HEADER_IMAGE}
        style={[styles.headerImage, isTablet && styles.headerImageTablet]}
        resizeMode="cover"
      >
        <View style={[styles.headerOverlay, { backgroundColor: colors.headerOverlay }]}>
          {/* Navigation Row */}
          <View style={styles.navRow}>
            <Pressable
              style={({ pressed }) => [
                styles.navButton,
                pressed && { opacity: 0.7, transform: [{ scale: 0.95 }] },
              ]}
              onPress={() => {}}
            >
              <Text style={styles.navButtonIcon}>←</Text>
              <Text style={styles.navButtonText}>Back</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.saveButton,
                { backgroundColor: colors.primary },
                pressed && { opacity: 0.85, transform: [{ scale: 0.95 }] },
              ]}
              onPress={() => {}}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </Pressable>
          </View>

          {/* Header Title */}
          <View style={styles.headerTitleArea}>
            <Text style={styles.headerLabel}>
              {title.length > 0 ? 'Editing Note' : 'New Note'}
            </Text>
            <Text style={styles.headerDate}>
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </Text>
          </View>
        </View>
      </ImageBackground>

      {/* Editor Body */}
      <ScrollView
        style={styles.editorScroll}
        contentContainerStyle={[
          styles.editorContent,
          isTablet && styles.editorContentTablet,
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Title Input */}
        <TextInput
          style={titleInputStyle}
          placeholder="Note title..."
          placeholderTextColor={colors.textTertiary}
          value={title}
          onChangeText={setTitle}
          onFocus={() => setIsTitleFocused(true)}
          onBlur={() => setIsTitleFocused(false)}
          returnKeyType="next"
          onSubmitEditing={() => bodyRef.current?.focus()}
          maxLength={100}
        />

        {/* Character count for title */}
        <Text style={[styles.charHint, { color: colors.textTertiary }]}>
          {title.length}/100
        </Text>

        {/* Body Input */}
        <TextInput
          ref={bodyRef}
          style={bodyInputStyle}
          placeholder="Start writing your note..."
          placeholderTextColor={colors.textTertiary}
          value={body}
          onChangeText={setBody}
          onFocus={() => setIsBodyFocused(true)}
          onBlur={() => setIsBodyFocused(false)}
          multiline
          textAlignVertical="top"
          scrollEnabled={false}
        />

        {/* Word/char stats */}
        <View style={[styles.statsRow, { borderTopColor: colors.border }]}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.primary }]}>{wordCount}</Text>
            <Text style={[styles.statLabel, { color: colors.textTertiary }]}>words</Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.primary }]}>{charCount}</Text>
            <Text style={[styles.statLabel, { color: colors.textTertiary }]}>characters</Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.primary }]}>
              {Math.ceil(wordCount / 200)}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textTertiary }]}>min read</Text>
          </View>
        </View>

        {/* Toolbar */}
        <View style={[styles.toolbar, { backgroundColor: colors.surfaceAlt, borderColor: colors.border }]}>
          {['𝐁', '𝐼', 'U̲', '🔗', '📎', '🏷️'].map((icon, index) => (
            <Pressable
              key={index}
              style={({ pressed }) => [
                styles.toolbarBtn,
                pressed && { backgroundColor: colors.primary + '20' },
              ]}
            >
              <Text style={[styles.toolbarIcon, { color: colors.textSecondary }]}>
                {icon}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerImage: {
    height: 200,
  },
  headerImageTablet: {
    height: 240,
  },
  headerOverlay: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 56 : 40,
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xl,
  },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.sm,
    paddingRight: Spacing.md,
  },
  navButtonIcon: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  navButtonText: {
    ...Typography.bodyBold,
    color: '#FFFFFF',
  },
  saveButton: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.sm + 2,
    borderRadius: Radius.full,
  },
  saveButtonText: {
    ...Typography.bodyBold,
    color: '#FFFFFF',
    fontSize: 14,
  },
  headerTitleArea: {
    gap: Spacing.xs,
  },
  headerLabel: {
    ...Typography.heading,
    color: '#FFFFFF',
    fontSize: 24,
  },
  headerDate: {
    ...Typography.caption,
    color: 'rgba(255, 255, 255, 0.75)',
  },
  editorScroll: {
    flex: 1,
  },
  editorContent: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing['2xl'],
    paddingBottom: 120,
  },
  editorContentTablet: {
    paddingHorizontal: Spacing['4xl'],
    maxWidth: 720,
    alignSelf: 'center',
    width: '100%',
  },
  titleInput: {
    ...Typography.heading,
    fontSize: 24,
    borderBottomWidth: 1,
    paddingBottom: Spacing.md,
    marginBottom: Spacing.xs,
  },
  charHint: {
    ...Typography.small,
    textAlign: 'right',
    marginBottom: Spacing.lg,
  },
  bodyInput: {
    ...Typography.body,
    fontSize: 16,
    lineHeight: 26,
    marginBottom: Spacing.xl,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.lg,
    borderTopWidth: 1,
    marginBottom: Spacing.lg,
    gap: Spacing.xl,
  },
  statItem: {
    alignItems: 'center',
    gap: 2,
  },
  statValue: {
    ...Typography.bodyBold,
    fontSize: 18,
  },
  statLabel: {
    ...Typography.small,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statDivider: {
    width: 1,
    height: 28,
  },
  toolbar: {
    flexDirection: 'row',
    borderRadius: Radius.md,
    borderWidth: 1,
    padding: Spacing.xs,
    gap: Spacing.xs,
  },
  toolbarBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.sm + 2,
    borderRadius: Radius.sm,
  },
  toolbarIcon: {
    fontSize: 16,
  },
});
