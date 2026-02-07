import { NewsCategory } from '../../../entities/news';

export type NewsDateFilter = 'all' | '24h' | '7d';

export type NewsFilterState = {
  category: NewsCategory | 'all';
  date: NewsDateFilter;
};
