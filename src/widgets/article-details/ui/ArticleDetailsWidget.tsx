import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';

import { ArticleDetailsContent, NewsArticle } from '../../../entities/news';

type Props = {
  article: NewsArticle;
  onOpenWebView: (url: string, title?: string) => void;
};

export function ArticleDetailsWidget({ article, onOpenWebView }: Props) {
  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <ArticleDetailsContent article={article} />
      <Pressable
        style={styles.button}
        onPress={() => onOpenWebView(article.url, article.title)}
      >
        <Text style={styles.buttonText}>Read Full Article</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 16,
    gap: 18,
  },
  button: {
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: '#111',
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});
