import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

type Props = {
  value: string;
  onChangeText: (value: string) => void;
  onClear: () => void;
};

export function NewsSearchInput({ value, onChangeText, onClear }: Props) {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search by title or keyword"
        placeholderTextColor="#8f8f8f"
        style={styles.input}
        autoCorrect={false}
      />
      {value.length > 0 ? (
        <Pressable onPress={onClear} style={styles.clearButton}>
          <Text style={styles.clearLabel}>Clear</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: '#d9d9d9',
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    color: '#111',
  },
  clearButton: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  clearLabel: {
    fontSize: 13,
    color: '#333',
    fontWeight: '600',
  },
});
