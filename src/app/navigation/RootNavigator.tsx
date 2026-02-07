import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ArticleDetailsScreen } from '../../pages/article-details/ui/ArticleDetailsScreen';
import { ArticleWebViewPage } from '../../pages/article-webview/ui/ArticleWebViewPage';
import { AuthScreen } from '../../pages/auth/ui/AuthScreen';
import { useAuth } from '../../processes/auth/model/useAuth';
import { TabsNavigator } from './TabsNavigator';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const { isAuthenticated, status } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isAuthenticated ? (
          <Stack.Screen
            name="Auth"
            component={AuthScreen}
            options={{ headerShown: status !== 'checking' }}
          />
        ) : (
          <>
            <Stack.Screen
              name="Tabs"
              component={TabsNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ArticleDetails"
              component={ArticleDetailsScreen}
              options={{ title: 'Article Details' }}
            />
            <Stack.Screen
              name="WebView"
              component={ArticleWebViewPage}
              options={({ route }) => ({ title: route.params.title ?? 'Article' })}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
