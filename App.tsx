import { StatusBar } from 'expo-status-bar';

import { RootNavigator } from './src/app/navigation/RootNavigator';
import { StoreProvider } from './src/app/providers/StoreProvider';

export default function App() {
  return (
    <StoreProvider>
      <StatusBar style="auto" />
      <RootNavigator />
    </StoreProvider>
  );
}
