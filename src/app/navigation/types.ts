import { NewsArticle } from '../../entities/news';

export type RootStackParamList = {
  Auth: undefined;
  Tabs: undefined;
  ArticleDetails: { article: NewsArticle };
  WebView: { url: string; title?: string };
};

export type BottomTabParamList = {
  News: undefined;
  Favorites: undefined;
  Settings: undefined;
};
