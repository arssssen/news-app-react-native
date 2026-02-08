import type { ComponentProps } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { FavoritesScreen } from '../../pages/favorites/ui/FavoritesScreen';
import { NewsPage } from '../../pages/news/ui/NewsPage';
import { SettingsAuthScreen } from '../../pages/settings-auth/ui/SettingsAuthScreen';
import { BottomTabParamList } from './types';

const Tab = createBottomTabNavigator<BottomTabParamList>();

export function TabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          const iconMap: Record<
            keyof BottomTabParamList,
            {
              focused: ComponentProps<typeof Ionicons>['name'];
              unfocused: ComponentProps<typeof Ionicons>['name'];
            }
          > = {
            News: { focused: 'newspaper', unfocused: 'newspaper-outline' },
            Favorites: { focused: 'heart', unfocused: 'heart-outline' },
            Settings: { focused: 'settings', unfocused: 'settings-outline' },
          };

          const icons = iconMap[route.name as keyof BottomTabParamList];

          return (
            <Ionicons
              name={focused ? icons.focused : icons.unfocused}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen name="News" component={NewsPage} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Settings" component={SettingsAuthScreen} />
    </Tab.Navigator>
  );
}
