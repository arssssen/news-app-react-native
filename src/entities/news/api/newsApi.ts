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
          query = 'latest',
          from,
          to,
          sortBy = 'publishedAt',
          language = 'en',
        } = params ?? {};

        return {
          url: '/everything',
          params: {
            q: query,
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
