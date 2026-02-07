import { useCallback, useState } from 'react';

import {
  initializeNotifications,
  scheduleTestLocalNotification,
} from './notificationsService';

type UseNotificationsResult = {
  permissionGranted: boolean;
  permissionMessage: string | null;
  isLoading: boolean;
  initialize: () => Promise<void>;
  sendTestNotification: () => Promise<void>;
};

export function useNotifications(): UseNotificationsResult {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [permissionMessage, setPermissionMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const initialize = useCallback(async () => {
    setIsLoading(true);
    setPermissionMessage(null);
    try {
      const result = await initializeNotifications();
      setPermissionGranted(result.granted);
      setPermissionMessage(result.message ?? null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const sendTestNotification = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await initializeNotifications();
      setPermissionGranted(result.granted);
      setPermissionMessage(result.message ?? null);

      if (!result.granted) {
        return;
      }

      await scheduleTestLocalNotification();
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    permissionGranted,
    permissionMessage,
    isLoading,
    initialize,
    sendTestNotification,
  };
}
