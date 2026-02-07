import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const ANDROID_CHANNEL_ID = 'default';

export async function configureNotificationChannel(): Promise<void> {
  if (Platform.OS !== 'android') {
    return;
  }

  await Notifications.setNotificationChannelAsync(ANDROID_CHANNEL_ID, {
    name: 'Default',
    importance: Notifications.AndroidImportance.DEFAULT,
  });
}

export async function requestNotificationPermission(): Promise<{
  granted: boolean;
  message?: string;
}> {
  const existing = await Notifications.getPermissionsAsync();
  if (existing.granted) {
    return { granted: true };
  }

  const asked = await Notifications.requestPermissionsAsync();
  if (!asked.granted) {
    return {
      granted: false,
      message: 'Notification permission was denied.',
    };
  }

  return { granted: true };
}

export async function scheduleTestLocalNotification(): Promise<void> {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'News App',
      body: 'This is a local notification test.',
      data: { type: 'test-local' },
    },
    trigger: null,
  });
}

export async function initializeNotifications(): Promise<{
  granted: boolean;
  message?: string;
}> {
  await configureNotificationChannel();
  const permissionResult = await requestNotificationPermission();

  // Remote push structure placeholder:
  // In production, when permission is granted, request Expo push token here
  // and send it to your backend for targeted notifications.
  // Example API: Notifications.getExpoPushTokenAsync({ projectId: '...' }).

  return permissionResult;
}
