import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

import { NewsArticle, NewsListItem } from '../../../entities/news';
import { RetryButton } from './RetryButton';
import { useNewsList } from '../model/useNewsList';

type Props = {
  onPressArticle: (article: NewsArticle) => void;
};

export function NewsListWidget({ onPressArticle }: Props) {
  const {
    articles,
    isInitialLoading,
    isFetchingNextPage,
    isRefreshing,
    errorMessage,
    loadNextPage,
    retry,
    refresh,
  } = useNewsList();

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
        <NewsListItem article={item} onPress={onPressArticle} />
      )}
      onEndReached={loadNextPage}
      onEndReachedThreshold={0.5}
      refreshing={isRefreshing}
      onRefresh={refresh}
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
