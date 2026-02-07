import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { FavoritesScreen } from '../../pages/favorites/ui/FavoritesScreen';
import { NewsPage } from '../../pages/news/ui/NewsPage';
import { SettingsAuthScreen } from '../../pages/settings-auth/ui/SettingsAuthScreen';
import { BottomTabParamList } from './types';

const Tab = createBottomTabNavigator<BottomTabParamList>();

export function TabsNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="News" component={NewsPage} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Settings" component={SettingsAuthScreen} />
    </Tab.Navigator>
  );
}
