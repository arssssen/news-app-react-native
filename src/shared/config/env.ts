const NEWS_API_KEY = process.env.EXPO_PUBLIC_NEWS_API_KEY;

if (!NEWS_API_KEY) {
  // Keep a runtime warning instead of crashing app startup.
  // The service can still be instantiated and fail with a clear API response.
  console.warn(
    'EXPO_PUBLIC_NEWS_API_KEY is not set. News requests will fail until it is configured.',
  );
}

export const env = {
  NEWS_API_KEY,
} as const;
