import { Pressable, StyleSheet, Text } from 'react-native';

type Props = {
  isFavorite: boolean;
  onPress: () => void;
};

export function FavoriteToggleButton({ isFavorite, onPress }: Props) {
  return (
    <Pressable
      style={[styles.button, isFavorite && styles.buttonActive]}
      onPress={onPress}
    >
      <Text style={[styles.label, isFavorite && styles.labelActive]}>
        {isFavorite ? 'Unfavorite' : 'Favorite'}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 6,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d5d5d5',
    backgroundColor: '#fff',
  },
  buttonActive: {
    borderColor: '#111',
    backgroundColor: '#111',
  },
  label: {
    fontSize: 12,
    color: '#222',
    fontWeight: '600',
  },
  labelActive: {
    color: '#fff',
  },
});
