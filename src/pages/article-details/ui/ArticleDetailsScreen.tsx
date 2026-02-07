import dayjs from 'dayjs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';

import { RootStackParamList } from '../../../app/navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'ArticleDetails'>;

export function ArticleDetailsScreen({ route }: Props) {
  const { article } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Article Details</Text>
      <Text style={styles.articleTitle}>{article.title}</Text>
      <Text style={styles.subtitle}>
        {dayjs(article.publishedAt).format('MMM D, YYYY h:mm A')}
      </Text>
      <Text style={styles.body}>
        {article.description ?? 'No description available.'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  articleTitle: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  body: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
});
