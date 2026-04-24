import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const SearchBar = ({ value, onChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🔍</Text>
      <TextInput
        placeholder="Cari produk KPOP..."
        value={value}
        onChangeText={onChange}
        style={styles.input}
      />
      {value.length > 0 && (
        <Text style={styles.clear} onPress={() => onChange('')}>
          ✕
        </Text>
      )}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#e0f2fe',
    margin: 12,
    padding: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  icon: { marginRight: 6 },
  input: { flex: 1 },
  clear: { color: '#999' },
});