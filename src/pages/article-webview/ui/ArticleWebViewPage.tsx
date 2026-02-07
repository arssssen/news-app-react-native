import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

import { RootStackParamList } from '../../../app/navigation/types';
import { ScreenContainer } from '../../../shared/ui/ScreenContainer';

type Props = NativeStackScreenProps<RootStackParamList, 'WebView'>;

export function ArticleWebViewPage({ route }: Props) {
  return (
    <ScreenContainer>
      <WebView
        source={{ uri: route.params.url }}
        startInLoadingState
        renderLoading={() => (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" />
          </View>
        )}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f7f7f7',
  },
});
