import { FlatList, StyleSheet, Text, View } from 'react-native';

import { NewsListItem } from '../../../entities/news';
import {
  selectFavoriteArticles,
  selectFavoritesHydrated,
} from '../../../features/toggle-favorite/model/favoritesSlice';
import { useFavoriteActions } from '../../../features/toggle-favorite/model/useFavoriteActions';
import { FavoriteToggleButton } from '../../../features/toggle-favorite/ui/FavoriteToggleButton';
import { useAppSelector } from '../../../shared/lib/hooks/redux';
import { NewsArticle } from '../../../entities/news';

type Props = {
  onPressArticle: (article: NewsArticle) => void;
};

function FavoriteRow({
  article,
  onPressArticle,
}: {
  article: NewsArticle;
  onPressArticle: (article: NewsArticle) => void;
}) {
  const { isFavorite, onToggleFavorite } = useFavoriteActions(article);

  return (
    <NewsListItem
      article={article}
      onPress={onPressArticle}
      footerAction={
        <FavoriteToggleButton isFavorite={isFavorite} onPress={onToggleFavorite} />
      }
    />
  );
}

export function FavoritesListWidget({ onPressArticle }: Props) {
  const favorites = useAppSelector(selectFavoriteArticles);
  const isHydrated = useAppSelector(selectFavoritesHydrated);

  if (!isHydrated) {
    return (
      <View style={styles.centered}>
        <Text style={styles.message}>Loading favorites...</Text>
      </View>
    );
  }

  if (favorites.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.message}>No favorites yet.</Text>
        <Text style={styles.subMessage}>
          Save articles from News to see them here.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favorites}
      keyExtractor={(item) => item.url}
      contentContainerStyle={styles.listContent}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      renderItem={({ item }) => (
        <FavoriteRow article={item} onPressArticle={onPressArticle} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  listContent: {
    padding: 12,
    paddingBottom: 24,
  },
  separator: {
    height: 10,
  },
  message: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
    marginBottom: 8,
    textAlign: 'center',
  },
  subMessage: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});
