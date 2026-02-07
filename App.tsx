import { StatusBar } from 'expo-status-bar';

import { RootNavigator } from './src/app/navigation/RootNavigator';
import { NotificationsProvider } from './src/app/providers/NotificationsProvider';
import { StoreProvider } from './src/app/providers/StoreProvider';

export default function App() {
  return (
    <StoreProvider>
      <NotificationsProvider>
        <StatusBar style="auto" />
        <RootNavigator />
      </NotificationsProvider>
    </StoreProvider>
  );
}
