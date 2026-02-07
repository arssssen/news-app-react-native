# News App React Native (Expo, TypeScript)

## Project Description
This project is a cross-platform mobile news application built with React Native (Expo) and TypeScript as a production-style technical assignment.

The app fetches news articles from NewsAPI, supports search and filtering, favorites persistence, in-app article reading via WebView, biometric authentication with logout flow, local push notifications, and file upload/download actions.

The implementation follows Feature-Sliced Design (FSD) with strict separation of UI and business logic.

## Tech Stack
- React Native + Expo (SDK 54)
- TypeScript (strict mode)
- Redux Toolkit + RTK Query
- React Navigation (Stack + Bottom Tabs)
- AsyncStorage (local persistence)
- Expo LocalAuthentication (Face ID / Touch ID)
- Expo Notifications (permission + local notifications)
- Expo DocumentPicker (file selection)
- Expo FileSystem (file downloading with progress)
- React Native WebView (in-app article page)

## Architecture: Feature-Sliced Design (FSD)
The project is organized by FSD layers:

- `src/app`
  - Global app wiring: providers, store, navigation
- `src/processes`
  - Cross-feature flows (authentication lifecycle)
- `src/pages`
  - Screen-level composition only (no business logic)
- `src/widgets`
  - Composed UI blocks used by pages
- `src/features`
  - User actions and isolated business logic (search/filter/favorites/auth/notifications/files)
- `src/entities`
  - Domain models and reusable entity UI (news article model + components + RTK Query service)
- `src/shared`
  - Reusable utilities, config, common UI primitives

### Design Rules Applied
- No storage/network/auth logic inside screen components
- Business logic extracted to feature/process model hooks and slices
- Reusable UI extracted to entities/widgets/features
- TypeScript types are explicit and strict

## Setup & Run

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment variables
Create a `.env` file in project root:
```env
EXPO_PUBLIC_NEWS_API_KEY=your_newsapi_key
```

Optional template:
- `.env.example` is provided for reference.

### 3. Start development server
```bash
npm run start
```

Platform shortcuts:
```bash
npm run android
npm run ios
npm run web
```

## Environment Variables

### `EXPO_PUBLIC_NEWS_API_KEY`
- Required for NewsAPI requests
- Consumed by RTK Query base API via request header: `X-Api-Key`
- If missing, app logs a warning and news requests will fail until key is set

## Feature Overview

### News List
- Infinite scroll with pagination
- Search input with debounce
- Filter by date and category
- Loading, error + retry, and empty states

### Article Details + WebView
- Details page displays title, image, author, date, description/content
- "Read Full Article" opens article URL in in-app WebView

### Favorites
- Add/remove favorites from article list
- Persisted in AsyncStorage
- Favorites hydrated on app launch
- Favorites screen supports empty state and remove action

### Biometric Authentication
- Implemented in process layer (`processes/auth`)
- App authenticates on launch using Expo LocalAuthentication
- Supports available biometric methods on device (Face ID / Touch ID / equivalent)
- Unsupported devices are handled gracefully with a support message
- Logout returns user to auth screen and clears sensitive local state

### Push Notifications
- Notification logic isolated in `features/push-notification`
- Permission registration on app startup
- Graceful handling when permission is denied
- Local test notification action available in Settings
- Remote push-ready structure documented in code comments (token registration placeholder)

### File Upload
- Uses Expo DocumentPicker
- Allows selecting image or document
- Upload is currently mocked (simulated request)
- Success/error feedback is shown in UI

### File Download
- Uses Expo FileSystem (legacy resumable API for progress callbacks)
- Downloads from URL to app document directory
- Displays download progress
- Handles error states (invalid URL/network/storage issues)

## Scripts
- `npm run start` – start Expo dev server
- `npm run android` – run on Android
- `npm run ios` – run on iOS
- `npm run web` – run on web

## Known Limitations and Assumptions
- NewsAPI free plan may enforce request limits and source restrictions
- Category filter uses `top-headlines`; other combinations use `everything`
- Search/filter behavior is optimized for simplicity over advanced query composition
- Upload endpoint is mocked (no real backend integration yet)
- Download flow currently saves with generated filename and does not expose file viewer/open action
- Notification setup currently focuses on local notifications; remote push backend is not implemented
- Biometric auth uses Expo local auth APIs without secure token/session backend

## Scaling Plan

### Product Scaling
- Add dedicated auth backend/session handling with refresh tokens
- Add server-backed favorites and user profile sync
- Add richer news filtering (source selection, sort controls, saved queries)
- Add article caching/offline reading

### Technical Scaling
- Introduce `app-init` process for deterministic startup orchestration
- Add end-to-end test coverage (Detox / Maestro) and unit tests for feature hooks/slices
- Add API error normalization layer and domain-level mappers
- Add design system tokens/components in `shared/ui`
- Add analytics + crash reporting integration
- Add CI/CD pipeline for lint/typecheck/test/build

## Reviewer Notes
- The code intentionally emphasizes maintainable architecture and separation of concerns over visual polish.
- Core assignment capabilities are implemented with reusable and extensible module boundaries.
