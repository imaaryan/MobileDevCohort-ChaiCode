/**
 * Notes Listing Screen
 *
 * Displays all notes in a scrollable FlatList with search/filter,
 * category filter pills, and a dark/light mode toggle switch.
 *
 * Uses:
 * - useColorScheme() for automatic theme detection
 * - useWindowDimensions() for responsive layouts
 * - StyleSheet.create(), StyleSheet.compose(), StyleSheet.flatten()
 * - FlatList, TextInput, Pressable, Switch
 */

import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Pressable,
  Switch,
  StyleSheet,
  StatusBar,
  useColorScheme,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { Colors, Spacing, Typography, Radius } from '../constants/theme';
import { NOTES, CATEGORIES, type Note } from '../constants/mockData';
import NoteCard from '../components/NoteCard';

export default function NotesListingScreen() {
  const systemScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemScheme === 'dark');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { width, height } = useWindowDimensions();

  const isDark = isDarkMode;
  const colors = isDark ? Colors.dark : Colors.light;
  const isTablet = width >= 768;
  const isLandscape = width > height;

  // Filter notes based on search and category
  const filteredNotes = useMemo(() => {
    let result = NOTES;

    if (selectedCategory !== 'All') {
      result = result.filter((note) => note.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (note) =>
          note.title.toLowerCase().includes(query) ||
          note.content.toLowerCase().includes(query)
      );
    }

    // Pinned notes first
    return result.sort((a, b) => (a.pinned === b.pinned ? 0 : a.pinned ? -1 : 1));
  }, [searchQuery, selectedCategory]);

  // Use StyleSheet.flatten to demonstrate the API — merge base + theme-specific header styles
  const headerStyle = StyleSheet.flatten([
    styles.header,
    { backgroundColor: colors.background },
  ]);

  const numColumns = isTablet && isLandscape ? 3 : isTablet ? 2 : 1;

  const renderNoteCard = ({ item }: { item: Note }) => (
    <View style={isTablet ? { flex: 1 / numColumns, padding: Spacing.xs } : undefined}>
      <NoteCard note={item} onPress={() => {}} />
    </View>
  );

  const renderHeader = () => (
    <>
      {/* Search Bar */}
      <View
        style={[
          styles.searchContainer,
          { backgroundColor: colors.searchBg, borderColor: colors.border },
        ]}
      >
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Search notes..."
          placeholderTextColor={colors.textTertiary}
          value={searchQuery}
          onChangeText={setSearchQuery}
          returnKeyType="search"
        />
        {searchQuery.length > 0 && (
          <Pressable onPress={() => setSearchQuery('')} hitSlop={8}>
            <Text style={[styles.clearBtn, { color: colors.textTertiary }]}>✕</Text>
          </Pressable>
        )}
      </View>

      {/* Category Filter Pills */}
      <FlatList
        horizontal
        data={CATEGORIES}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
        renderItem={({ item: category }) => {
          const isSelected = selectedCategory === category;
          return (
            <Pressable
              onPress={() => setSelectedCategory(category)}
              style={[
                styles.categoryPill,
                {
                  backgroundColor: isSelected ? colors.primary : colors.searchBg,
                  borderColor: isSelected ? colors.primary : colors.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.categoryPillText,
                  {
                    color: isSelected
                      ? '#FFFFFF'
                      : colors.textSecondary,
                  },
                ]}
              >
                {category}
              </Text>
            </Pressable>
          );
        }}
      />

      {/* Notes count */}
      <Text style={[styles.notesCount, { color: colors.textTertiary }]}>
        {filteredNotes.length} {filteredNotes.length === 1 ? 'note' : 'notes'}
      </Text>
    </>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      {/* Header */}
      <View style={headerStyle}>
        <View style={styles.headerContent}>
          <View>
            <Text style={[styles.headerGreeting, { color: colors.textSecondary }]}>
              Your Notes
            </Text>
            <Text style={[styles.headerTitle, { color: colors.text }]}>
              Notes ✨
            </Text>
          </View>

          {/* Dark Mode Toggle */}
          <View style={styles.themeToggle}>
            <Text style={[styles.themeLabel, { color: colors.textSecondary }]}>
              {isDark ? '🌙' : '☀️'}
            </Text>
            <Switch
              value={isDarkMode}
              onValueChange={setIsDarkMode}
              trackColor={{
                false: colors.switchTrackFalse,
                true: colors.switchTrackTrue,
              }}
              thumbColor={colors.switchThumb}
              ios_backgroundColor={colors.switchTrackFalse}
            />
          </View>
        </View>
      </View>

      {/* Notes List */}
      <FlatList
        key={numColumns} // Force re-render when columns change
        data={filteredNotes}
        keyExtractor={(item) => item.id}
        renderItem={renderNoteCard}
        numColumns={numColumns}
        contentContainerStyle={[
          styles.listContent,
          isTablet && { paddingHorizontal: Spacing['2xl'] },
        ]}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>📝</Text>
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              No notes found
            </Text>
            <Text style={[styles.emptySubtext, { color: colors.textTertiary }]}>
              Try adjusting your search or category filter
            </Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />

      {/* FAB — Add New Note */}
      <Pressable
        style={({ pressed }) => [
          styles.fab,
          { backgroundColor: colors.primary },
          pressed && { opacity: 0.85, transform: [{ scale: 0.95 }] },
        ]}
        onPress={() => {}}
      >
        <Text style={styles.fabIcon}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 44,
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.lg,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerGreeting: {
    ...Typography.caption,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: Spacing.xs,
  },
  headerTitle: {
    ...Typography.heading,
    fontSize: 32,
  },
  themeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  themeLabel: {
    fontSize: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Platform.OS === 'ios' ? Spacing.md : Spacing.xs,
    marginBottom: Spacing.md,
    borderWidth: 1,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    ...Typography.body,
    paddingVertical: Spacing.xs,
  },
  clearBtn: {
    fontSize: 16,
    padding: Spacing.xs,
  },
  categoryList: {
    paddingBottom: Spacing.md,
    gap: Spacing.sm,
  },
  categoryPill: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.full,
    borderWidth: 1,
  },
  categoryPillText: {
    ...Typography.caption,
    fontWeight: '600',
  },
  notesCount: {
    ...Typography.small,
    marginBottom: Spacing.md,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  listContent: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: 100,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: Spacing.lg,
  },
  emptyText: {
    ...Typography.subheading,
    marginBottom: Spacing.sm,
  },
  emptySubtext: {
    ...Typography.body,
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    right: Spacing.xl,
    bottom: Spacing['4xl'],
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  fabIcon: {
    fontSize: 28,
    color: '#FFFFFF',
    fontWeight: '300',
    marginTop: -2,
  },
});
