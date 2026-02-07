import dayjs from 'dayjs';
import { useMemo, useState } from 'react';

import { NewsCategory } from '../../../entities/news';
import { NewsDateFilter } from './types';

type UseNewsFilterResult = {
  selectedCategory: NewsCategory | 'all';
  selectedDateFilter: NewsDateFilter;
  categoryParam?: NewsCategory;
  fromParam?: string;
  toParam?: string;
  setCategory: (category: NewsCategory | 'all') => void;
  setDateFilter: (date: NewsDateFilter) => void;
};

export function useNewsFilter(): UseNewsFilterResult {
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory | 'all'>('all');
  const [selectedDateFilter, setSelectedDateFilter] = useState<NewsDateFilter>('all');

  const setCategory = (category: NewsCategory | 'all') => {
    setSelectedCategory(category);
    if (category !== 'all') {
      setSelectedDateFilter('all');
    }
  };

  const setDateFilter = (date: NewsDateFilter) => {
    setSelectedDateFilter(date);
    if (date !== 'all') {
      setSelectedCategory('all');
    }
  };

  const fromParam = useMemo(() => {
    if (selectedDateFilter === '24h') {
      return dayjs().subtract(1, 'day').toISOString();
    }
    if (selectedDateFilter === '7d') {
      return dayjs().subtract(7, 'day').toISOString();
    }
    return undefined;
  }, [selectedDateFilter]);

  const toParam = useMemo(() => {
    if (selectedDateFilter === 'all') {
      return undefined;
    }
    return dayjs().toISOString();
  }, [selectedDateFilter]);

  return {
    selectedCategory,
    selectedDateFilter,
    categoryParam: selectedCategory === 'all' ? undefined : selectedCategory,
    fromParam,
    toParam,
    setCategory,
    setDateFilter,
  };
}
