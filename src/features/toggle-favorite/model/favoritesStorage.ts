import AsyncStorage from '@react-native-async-storage/async-storage';

import { NewsArticle } from '../../../entities/news';

const FAVORITES_STORAGE_KEY = 'favorite_articles_v1';

export async function readFavoritesFromStorage(): Promise<NewsArticle[]> {
  const rawValue = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
  if (!rawValue) {
    return [];
  }

  try {
    const parsed = JSON.parse(rawValue) as NewsArticle[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function writeFavoritesToStorage(
  articles: NewsArticle[],
): Promise<void> {
  await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(articles));
}
