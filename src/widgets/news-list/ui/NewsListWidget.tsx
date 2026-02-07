import { useMemo } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

import { NewsArticle, NewsListItem } from '../../../entities/news';
import { useNewsFilter } from '../../../features/news-filter/model/useNewsFilter';
import { NewsFilterBar } from '../../../features/news-filter/ui/NewsFilterBar';
import { useNewsSearch } from '../../../features/news-search/model/useNewsSearch';
import { NewsSearchInput } from '../../../features/news-search/ui/NewsSearchInput';
import { useFavoriteActions } from '../../../features/toggle-favorite/model/useFavoriteActions';
import { FavoriteToggleButton } from '../../../features/toggle-favorite/ui/FavoriteToggleButton';
import { RetryButton } from './RetryButton';
import { useNewsList } from '../model/useNewsList';

type Props = {
  onPressArticle: (article: NewsArticle) => void;
};

function NewsRow({
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

export function NewsListWidget({ onPressArticle }: Props) {
  const {
    searchText,
    debouncedSearchText,
    onChangeSearchText,
    clearSearch,
  } = useNewsSearch();
  const {
    selectedCategory,
    selectedDateFilter,
    categoryParam,
    fromParam,
    toParam,
    setCategory,
    setDateFilter,
  } = useNewsFilter();

  const filters = useMemo(
    () => ({
      query: debouncedSearchText,
      from: fromParam,
      to: toParam,
      category: categoryParam,
    }),
    [categoryParam, debouncedSearchText, fromParam, toParam],
  );

  const {
    articles,
    isInitialLoading,
    isFetchingNextPage,
    isRefreshing,
    errorMessage,
    loadNextPage,
    retry,
    refresh,
  } = useNewsList(filters);

  if (isInitialLoading && articles.length === 0) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (errorMessage && articles.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.message}>Failed to load news.</Text>
        <Text style={styles.subMessage}>{errorMessage}</Text>
        <RetryButton onPress={retry} />
      </View>
    );
  }

  if (!isInitialLoading && articles.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.message}>No articles found.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={articles}
      keyExtractor={(item, index) => `${item.url}-${index}`}
      contentContainerStyle={styles.listContent}
      renderItem={({ item }) => (
        <NewsRow article={item} onPressArticle={onPressArticle} />
      )}
      onEndReached={loadNextPage}
      onEndReachedThreshold={0.5}
      refreshing={isRefreshing}
      onRefresh={refresh}
      ListHeaderComponent={
        <View style={styles.header}>
          <NewsSearchInput
            value={searchText}
            onChangeText={onChangeSearchText}
            onClear={clearSearch}
          />
          <NewsFilterBar
            selectedCategory={selectedCategory}
            selectedDateFilter={selectedDateFilter}
            onSelectCategory={setCategory}
            onSelectDateFilter={setDateFilter}
          />
        </View>
      }
      ListFooterComponent={
        isFetchingNextPage ? (
          <View style={styles.footerLoader}>
            <ActivityIndicator />
          </View>
        ) : null
      }
      ItemSeparatorComponent={() => <View style={styles.separator} />}
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
  header: {
    marginBottom: 2,
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
    marginBottom: 14,
  },
  separator: {
    height: 10,
  },
  footerLoader: {
    paddingVertical: 16,
  },
});
