import { useCallback } from 'react';

import { NewsArticle } from '../../../entities/news';
import { useAppDispatch, useAppSelector } from '../../../shared/lib/hooks/redux';
import { removeFavorite, selectIsFavorite, toggleFavorite } from './favoritesSlice';

export function useFavoriteActions(article: NewsArticle) {
  const dispatch = useAppDispatch();
  const articleId = article.url;
  const isFavorite = useAppSelector(selectIsFavorite(articleId));

  const onToggleFavorite = useCallback(() => {
    void dispatch(toggleFavorite(article));
  }, [article, dispatch]);

  const onRemoveFavorite = useCallback(() => {
    void dispatch(removeFavorite(articleId));
  }, [articleId, dispatch]);

  return {
    isFavorite,
    onToggleFavorite,
    onRemoveFavorite,
  };
}
