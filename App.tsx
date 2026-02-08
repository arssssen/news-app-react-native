import { StatusBar } from 'expo-status-bar'

import { RootNavigator } from './src/app/navigation/RootNavigator'
import { NotificationsProvider } from './src/app/providers/NotificationsProvider'
import { StoreProvider } from './src/app/providers/StoreProvider'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export default function App() {
  return (
    <StoreProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NotificationsProvider>
          <StatusBar style="auto" />
          <RootNavigator />
        </NotificationsProvider>
      </GestureHandlerRootView>
    </StoreProvider>
  )
}
