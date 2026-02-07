import { Pressable, StyleSheet, Text, View } from 'react-native';

import { NewsCategory } from '../../../entities/news';
import { NewsDateFilter } from '../model/types';

const CATEGORIES: Array<NewsCategory | 'all'> = [
  'all',
  'business',
  'entertainment',
  'health',
  'science',
  'sports',
  'technology',
];

const DATE_FILTERS: NewsDateFilter[] = ['all', '24h', '7d'];

type Props = {
  selectedCategory: NewsCategory | 'all';
  selectedDateFilter: NewsDateFilter;
  onSelectCategory: (category: NewsCategory | 'all') => void;
  onSelectDateFilter: (filter: NewsDateFilter) => void;
};

export function NewsFilterBar({
  selectedCategory,
  selectedDateFilter,
  onSelectCategory,
  onSelectDateFilter,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Category</Text>
      <View style={styles.row}>
        {CATEGORIES.map((category) => {
          const isActive = selectedCategory === category;
          return (
            <Pressable
              key={category}
              onPress={() => onSelectCategory(category)}
              style={[styles.chip, isActive && styles.chipActive]}
            >
              <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
                {category}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.label}>Date</Text>
      <View style={styles.row}>
        {DATE_FILTERS.map((filter) => {
          const isActive = selectedDateFilter === filter;
          return (
            <Pressable
              key={filter}
              onPress={() => onSelectDateFilter(filter)}
              style={[styles.chip, isActive && styles.chipActive]}
            >
              <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
                {filter}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    gap: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4f4f4f',
    textTransform: 'uppercase',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    borderWidth: 1,
    borderColor: '#d8d8d8',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#fff',
  },
  chipActive: {
    backgroundColor: '#111',
    borderColor: '#111',
  },
  chipText: {
    color: '#222',
    fontSize: 12,
    textTransform: 'capitalize',
  },
  chipTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
});
