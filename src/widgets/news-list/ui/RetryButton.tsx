import { Pressable, StyleSheet, Text } from 'react-native';

type Props = {
  onPress: () => void;
};

export function RetryButton({ onPress }: Props) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.label}>Retry</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#111',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  label: {
    color: '#fff',
    fontWeight: '600',
  },
});
