import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useNotifications } from '../../../features/push-notification/model/useNotifications';
import { useAuth } from '../../../processes/auth/model/useAuth';
import { ScreenContainer } from '../../../shared/ui/ScreenContainer';

export function SettingsAuthScreen() {
  const { status, supportMessage, logoutUser } = useAuth();
  const {
    permissionGranted,
    permissionMessage,
    isLoading: isNotificationsLoading,
    initialize,
    sendTestNotification,
  } = useNotifications();

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Auth status: {status}</Text>
        {supportMessage ? <Text style={styles.subtitle}>{supportMessage}</Text> : null}

        <Text style={styles.subtitle}>
          Notifications: {permissionGranted ? 'enabled' : 'not enabled'}
        </Text>
        {permissionMessage ? (
          <Text style={styles.subtitle}>{permissionMessage}</Text>
        ) : null}

        <Pressable
          style={styles.button}
          onPress={initialize}
          disabled={isNotificationsLoading}
        >
          <Text style={styles.buttonLabel}>Request Notification Permission</Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={sendTestNotification}
          disabled={isNotificationsLoading}
        >
          <Text style={styles.buttonLabel}>Send Test Notification</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={logoutUser}>
          <Text style={styles.buttonLabel}>Logout</Text>
        </Pressable>
      </View>
    </ScreenContainer>
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
    textAlign: 'center',
  },
  button: {
    marginTop: 8,
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
