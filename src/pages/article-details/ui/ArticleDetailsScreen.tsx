import { StyleSheet, Text, View } from 'react-native';

export function ArticleDetailsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Article Details</Text>
      <Text style={styles.subtitle}>Article details placeholder</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
});
