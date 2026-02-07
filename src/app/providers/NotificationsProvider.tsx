import { PropsWithChildren, useEffect } from 'react';

import { initializeNotifications } from '../../features/push-notification/model/notificationsService';

export function NotificationsProvider({ children }: PropsWithChildren) {
  useEffect(() => {
    void initializeNotifications();
  }, []);

  return <>{children}</>;
}
