import { baseApi } from '../../../shared/api/baseApi';
import { GetNewsParams, NewsApiResponse } from '../model/types';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 20;

export const newsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNews: builder.query<NewsApiResponse, GetNewsParams | void>({
      query: (params) => {
        const {
          page = DEFAULT_PAGE,
          pageSize = DEFAULT_PAGE_SIZE,
          query,
          from,
          to,
          sortBy = 'publishedAt',
          language = 'en',
          category,
          country = 'us',
        } = params ?? {};

        const normalizedQuery = query?.trim();

        if (category) {
          return {
            url: '/top-headlines',
            params: {
              category,
              country,
              q: normalizedQuery || undefined,
              page,
              pageSize,
            },
          };
        }

        return {
          url: '/everything',
          params: {
            q: normalizedQuery || 'latest',
            page,
            pageSize,
            from,
            to,
            sortBy,
            language,
          },
        };
      },
      providesTags: (_result, _error, arg) => [
        { type: 'News', id: `LIST-${arg?.query ?? 'latest'}` },
      ],
    }),
  }),
  overrideExisting: false,
});

export const { useGetNewsQuery, useLazyGetNewsQuery } = newsApi;
