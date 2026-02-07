import { useEffect, useState } from 'react';

const SEARCH_DEBOUNCE_MS = 400;

type UseNewsSearchResult = {
  searchText: string;
  debouncedSearchText: string;
  onChangeSearchText: (value: string) => void;
  clearSearch: () => void;
};

export function useNewsSearch(): UseNewsSearchResult {
  const [searchText, setSearchText] = useState('');
  const [debouncedSearchText, setDebouncedSearchText] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchText(searchText.trim());
    }, SEARCH_DEBOUNCE_MS);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchText]);

  const onChangeSearchText = (value: string) => {
    setSearchText(value);
  };

  const clearSearch = () => {
    setSearchText('');
    setDebouncedSearchText('');
  };

  return {
    searchText,
    debouncedSearchText,
    onChangeSearchText,
    clearSearch,
  };
}
