import dayjs from 'dayjs';
import { Image, StyleSheet, Text, View } from 'react-native';

import { NewsArticle } from '../model/types';

type Props = {
  article: NewsArticle;
};

export function ArticleDetailsContent({ article }: Props) {
  return (
    <View style={styles.wrapper}>
      {article.urlToImage ? (
        <Image source={{ uri: article.urlToImage }} style={styles.image} />
      ) : null}

      <Text style={styles.title}>{article.title}</Text>

      <View style={styles.metaRow}>
        {article.author ? (
          <Text style={styles.metaText} numberOfLines={1}>
            By {article.author}
          </Text>
        ) : null}
        <Text style={styles.metaText}>
          {dayjs(article.publishedAt).format('MMM D, YYYY h:mm A')}
        </Text>
      </View>

      {article.description ? (
        <Text style={styles.description}>{article.description}</Text>
      ) : null}

      {article.content ? (
        <Text style={styles.content}>{article.content}</Text>
      ) : (
        <Text style={styles.content}>No full content provided by source.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 12,
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    backgroundColor: '#e4e4e4',
  },
  title: {
    fontSize: 22,
    lineHeight: 30,
    fontWeight: '700',
    color: '#111',
  },
  metaRow: {
    gap: 6,
  },
  metaText: {
    fontSize: 13,
    color: '#666',
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: '#333',
    fontWeight: '500',
  },
  content: {
    fontSize: 15,
    lineHeight: 23,
    color: '#222',
  },
});
