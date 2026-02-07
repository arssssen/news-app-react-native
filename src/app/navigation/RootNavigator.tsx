import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ArticleDetailsScreen } from '../../pages/article-details/ui/ArticleDetailsScreen';
import { ArticleWebViewPage } from '../../pages/article-webview/ui/ArticleWebViewPage';
import { TabsNavigator } from './TabsNavigator';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
