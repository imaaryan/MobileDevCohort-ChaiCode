import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  StyleSheet,
  useColorScheme,
  useWindowDimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

// Simple Theme Colors
const Colors = {
  light: { bg: '#F5F5F5', card: '#FFF', text: '#000', primary: '#007AFF', accent: '#FF3B30' },
  dark: { bg: '#121212', card: '#1E1E1E', text: '#FFF', primary: '#0A84FF', accent: '#FF453A' },
};

export default function BasicNotesApp() {
  const [note, setNote] = useState('');
  const [notesList, setNotesList] = useState<{ id: string; text: string }[]>([]);
  
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const { width } = useWindowDimensions();

  // Add Note Function
  const addNote = () => {
    if (note.trim().length > 0) {
      setNotesList([...notesList, { id: Date.now().toString(), text: note }]);
      setNote('');
    }
  };

  // Delete Note Function
  const deleteNote = (id: string) => {
    setNotesList(notesList.filter((item) => item.id !== id));
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: colors.bg }]}
    >
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>My Tasks 📝</Text>

        {/* Input Area */}
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
            placeholder="Write a task..."
            placeholderTextColor="#999"
            value={note}
            onChangeText={setNote}
          />
          <Pressable 
            style={({ pressed }) => [
              styles.addButton, 
              { backgroundColor: colors.primary, opacity: pressed ? 0.7 : 1 }
            ]} 
            onPress={addNote}
          >
            <Text style={styles.buttonText}>Add</Text>
          </Pressable>
        </View>

        {/* Notes List */}
        <FlatList
          data={notesList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={[styles.noteCard, { backgroundColor: colors.card }]}>
              <Text style={[styles.noteText, { color: colors.text }]}>{item.text}</Text>
              <Pressable onPress={() => deleteNote(item.id)}>
                <Text style={[styles.deleteText, { color: colors.accent }]}>Delete</Text>
              </Pressable>
            </View>
          )}
          ListEmptyComponent={
            <Text style={[styles.emptyText, { color: '#888' }]}>No tasks yet. Add some!</Text>
          }
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10,
  },
  input: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  addButton: {
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  noteCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    // Example of using StyleSheet.compose internally (implied by array style in renderItem)
  },
  noteText: {
    fontSize: 16,
    flex: 1,
  },
  deleteText: {
    fontWeight: 'bold',
    marginLeft: 10,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
  }
});
