import { ReactNode } from 'react';
import dayjs from 'dayjs';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { NewsArticle } from '../model/types';

type Props = {
  article: NewsArticle;
  onPress: (article: NewsArticle) => void;
  footerAction?: ReactNode;
};

export function NewsListItem({ article, onPress, footerAction }: Props) {
  return (
    <Pressable style={styles.card} onPress={() => onPress(article)}>
      {article.urlToImage ? (
        <Image source={{ uri: article.urlToImage }} style={styles.image} />
      ) : (
        <View style={[styles.image, styles.placeholder]} />
      )}

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {article.title}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {article.description ?? 'No description available.'}
        </Text>
        <Text style={styles.date}>{dayjs(article.publishedAt).format('MMM D, YYYY')}</Text>
        {footerAction}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ececec',
  },
  image: {
    width: 96,
    height: 96,
    borderRadius: 10,
  },
  placeholder: {
    backgroundColor: '#e8e8e8',
  },
  content: {
    flex: 1,
    gap: 6,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111',
  },
  description: {
    fontSize: 13,
    color: '#666',
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
});
