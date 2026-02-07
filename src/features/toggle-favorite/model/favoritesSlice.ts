import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NewsArticle } from '../../../entities/news';
import type { RootState } from '../../../app/store';
import {
  readFavoritesFromStorage,
  writeFavoritesToStorage,
} from './favoritesStorage';

type FavoritesState = {
  items: Record<string, NewsArticle>;
  ids: string[];
  isHydrated: boolean;
};

const initialState: FavoritesState = {
  items: {},
  ids: [],
  isHydrated: false,
};

function getArticleId(article: NewsArticle): string {
  return article.url;
}

function toArticleList(state: FavoritesState): NewsArticle[] {
  return state.ids
    .map((id) => state.items[id])
    .filter((article): article is NewsArticle => Boolean(article));
}

function toggleFavoriteReducer(state: FavoritesState, article: NewsArticle): void {
  const id = getArticleId(article);
  const isFavorite = Boolean(state.items[id]);

  if (isFavorite) {
    delete state.items[id];
    state.ids = state.ids.filter((existingId) => existingId !== id);
    return;
  }

  state.items[id] = article;
  state.ids = [id, ...state.ids];
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorites(state, action: PayloadAction<NewsArticle[]>) {
      const nextItems: Record<string, NewsArticle> = {};
      const nextIds: string[] = [];

      action.payload.forEach((article) => {
        const id = getArticleId(article);
        if (nextItems[id]) {
          return;
        }
        nextItems[id] = article;
        nextIds.push(id);
      });

      state.items = nextItems;
      state.ids = nextIds;
      state.isHydrated = true;
    },
    toggleFavoriteLocal(state, action: PayloadAction<NewsArticle>) {
      toggleFavoriteReducer(state, action.payload);
    },
    removeFavoriteLocal(state, action: PayloadAction<string>) {
      const id = action.payload;
      if (!state.items[id]) {
        return;
      }
      delete state.items[id];
      state.ids = state.ids.filter((existingId) => existingId !== id);
    },
  },
});

export const hydrateFavorites = createAsyncThunk(
  'favorites/hydrate',
  async (_, { dispatch }) => {
    const articles = await readFavoritesFromStorage();
    dispatch(setFavorites(articles));
  },
);

export const toggleFavorite = createAsyncThunk(
  'favorites/toggle',
  async (article: NewsArticle, { dispatch, getState }) => {
    dispatch(toggleFavoriteLocal(article));
    const state = getState() as RootState;
    await writeFavoritesToStorage(toArticleList(state.favorites));
  },
);

export const removeFavorite = createAsyncThunk(
  'favorites/remove',
  async (articleId: string, { dispatch, getState }) => {
    dispatch(removeFavoriteLocal(articleId));
    const state = getState() as RootState;
    await writeFavoritesToStorage(toArticleList(state.favorites));
  },
);

export const { setFavorites, toggleFavoriteLocal, removeFavoriteLocal } =
  favoritesSlice.actions;

export const favoritesReducer = favoritesSlice.reducer;

export const selectFavoriteArticles = (state: RootState): NewsArticle[] =>
  state.favorites.ids
    .map((id) => state.favorites.items[id])
    .filter((article): article is NewsArticle => Boolean(article));

export const selectIsFavorite =
  (articleId: string) =>
  (state: RootState): boolean =>
    Boolean(state.favorites.items[articleId]);

export const selectFavoritesHydrated = (state: RootState): boolean =>
  state.favorites.isHydrated;
