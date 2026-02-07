import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, StyleSheet, Text, View } from 'react-native';

import {
  BottomTabParamList,
  RootStackParamList,
} from '../../../app/navigation/types';

type Props = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, 'News'>,
  NativeStackScreenProps<RootStackParamList>
>;

export function NewsListScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>News</Text>
      <Text style={styles.subtitle}>News list placeholder</Text>

      <Button
        title="Open Article Details"
        onPress={() => navigation.navigate('ArticleDetails')}
      />
      <View style={styles.spacer} />
      <Button
        title="Open WebView"
        onPress={() =>
          navigation.navigate('WebView', {
            url: 'https://example.com',
            title: 'Example Article',
          })
        }
      />
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
    marginBottom: 20,
  },
  spacer: {
    height: 12,
  },
});
