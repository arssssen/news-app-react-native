import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';

import { BottomTabParamList, RootStackParamList } from '../../../app/navigation/types';
import { NewsArticle } from '../../../entities/news';
import { ScreenContainer } from '../../../shared/ui/ScreenContainer';
import { FavoritesListWidget } from '../../../widgets/favorites-list/ui/FavoritesListWidget';

type Props = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, 'Favorites'>,
  NativeStackScreenProps<RootStackParamList>
>;

export function FavoritesScreen({ navigation }: Props) {
  const handlePressArticle = useCallback(
    (article: NewsArticle) => {
      navigation.navigate('ArticleDetails', { article });
    },
    [navigation],
  );

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <FavoritesListWidget onPressArticle={handlePressArticle} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
