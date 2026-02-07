import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback } from 'react';

import { RootStackParamList } from '../../../app/navigation/types';
import { ScreenContainer } from '../../../shared/ui/ScreenContainer';
import { ArticleDetailsWidget } from '../../../widgets/article-details/ui/ArticleDetailsWidget';

type Props = NativeStackScreenProps<RootStackParamList, 'ArticleDetails'>;

export function ArticleDetailsScreen({ navigation, route }: Props) {
  const { article } = route.params;
  const handleOpenWebView = useCallback(
    (url: string, title?: string) => {
      navigation.navigate('WebView', { url, title });
    },
    [navigation],
  );

  return (
    <ScreenContainer>
      <ArticleDetailsWidget
        article={article}
        onOpenWebView={handleOpenWebView}
      />
    </ScreenContainer>
  );
}
