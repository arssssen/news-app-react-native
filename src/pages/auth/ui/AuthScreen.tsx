import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import { useAuth } from '../../../processes/auth/model/useAuth';
import { ScreenContainer } from '../../../shared/ui/ScreenContainer';

export function AuthScreen() {
  const { status, errorMessage, supportMessage, retryAuth } = useAuth();

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <Text style={styles.title}>Authentication</Text>
        {status === 'checking' ? (
          <ActivityIndicator size="large" />
        ) : (
          <>
            <Text style={styles.message}>
              Unlock with Face ID / Touch ID to continue.
            </Text>
            {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
            {supportMessage ? (
              <Text style={styles.support}>{supportMessage}</Text>
            ) : null}
            <Pressable style={styles.button} onPress={retryAuth}>
              <Text style={styles.buttonLabel}>Try Again</Text>
            </Pressable>
          </>
        )}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111',
  },
  message: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
  error: {
    fontSize: 13,
    color: '#b00020',
    textAlign: 'center',
  },
  support: {
    fontSize: 13,
    color: '#555',
    textAlign: 'center',
  },
  button: {
    marginTop: 4,
    backgroundColor: '#111',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  buttonLabel: {
    color: '#fff',
    fontWeight: '600',
  },
});
