import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';

import { BottomTabParamList, RootStackParamList } from '../../../app/navigation/types';
import { NewsArticle } from '../../../entities/news';
import { NewsListWidget } from '../../../widgets/news-list/ui/NewsListWidget';

type Props = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, 'News'>,
  NativeStackScreenProps<RootStackParamList>
>;

export function NewsPage({ navigation }: Props) {
  const handlePressArticle = useCallback(
    (article: NewsArticle) => {
      navigation.navigate('ArticleDetails', { article });
    },
    [navigation],
  );

  return (
    <View style={styles.container}>
      <NewsListWidget onPressArticle={handlePressArticle} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
});
