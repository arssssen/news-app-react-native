import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { NewsArticle, useLazyGetNewsQuery } from '../../../entities/news';

const PAGE_SIZE = 20;

type UseNewsListResult = {
  articles: NewsArticle[];
  isInitialLoading: boolean;
  isFetchingNextPage: boolean;
  isRefreshing: boolean;
  errorMessage: string | null;
  hasMore: boolean;
  loadNextPage: () => void;
  retry: () => void;
  refresh: () => void;
};

export function useNewsList(): UseNewsListResult {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [trigger] = useLazyGetNewsQuery();
  const requestInFlightRef = useRef(false);

  const hasMore = useMemo(
    () => articles.length < totalResults || (page === 1 && articles.length === 0),
    [articles.length, page, totalResults],
  );

  const fetchPage = useCallback(
    async (nextPage: number, mode: 'initial' | 'next' | 'refresh') => {
      if (requestInFlightRef.current) {
        return;
      }

      requestInFlightRef.current = true;
      if (mode === 'initial') {
        setIsInitialLoading(true);
      } else if (mode === 'next') {
        setIsFetchingNextPage(true);
      } else {
        setIsRefreshing(true);
      }
      setErrorMessage(null);

      try {
        const result = await trigger(
          {
            page: nextPage,
            pageSize: PAGE_SIZE,
            query: 'latest',
            sortBy: 'publishedAt',
          },
          true,
        ).unwrap();

        setTotalResults(result.totalResults);
        setPage(nextPage);
        setArticles((prev) =>
          nextPage === 1 ? result.articles : [...prev, ...result.articles],
        );
      } catch (error) {
        const message =
          error && typeof error === 'object' && 'data' in error
            ? String((error as { data?: { message?: string } }).data?.message ?? 'Failed to load news.')
            : 'Failed to load news.';
        setErrorMessage(message);
      } finally {
        requestInFlightRef.current = false;
        setIsInitialLoading(false);
        setIsFetchingNextPage(false);
        setIsRefreshing(false);
      }
    },
    [trigger],
  );

  useEffect(() => {
    void fetchPage(1, 'initial');
  }, [fetchPage]);

  const loadNextPage = useCallback(() => {
    if (!hasMore || isInitialLoading || isFetchingNextPage || isRefreshing) {
      return;
    }
    void fetchPage(page + 1, 'next');
  }, [fetchPage, hasMore, isFetchingNextPage, isInitialLoading, isRefreshing, page]);

  const retry = useCallback(() => {
    void fetchPage(1, 'initial');
  }, [fetchPage]);

  const refresh = useCallback(() => {
    void fetchPage(1, 'refresh');
  }, [fetchPage]);

  return {
    articles,
    isInitialLoading,
    isFetchingNextPage,
    isRefreshing,
    errorMessage,
    hasMore,
    loadNextPage,
    retry,
    refresh,
  };
}
