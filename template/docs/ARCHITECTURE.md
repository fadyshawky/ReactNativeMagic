# Architecture

## Overview

This app uses a layered structure: **UI** (screens, components) → **navigation** → **core** (store, api, theme, config) and **common** (components, localization, helpers).

## Folder map

| Folder | Purpose |
|--------|--------|
| `src/common/` | Shared UI components, localization (i18n), helpers, validations, hooks, urls, utils |
| `src/core/` | Store (Redux + persist), API client, theme, config, services, hooks |
| `src/navigation/` | Navigator setup, auth stack, main stack, tab bar, header components |
| `src/screens/` | Feature screens (Login, Home, Profile, etc.); each may have local `components/` and `hooks/` |
| `src/sheetManager/` | Action sheet registration |

## Data flow

- **Auth**: Token is stored in Redux (`user.accessToken`). Navigation shows Auth stack when there is no token, Main stack when there is.
- **API**: Single axios instance in `src/core/api/serverHeaders.ts`. Base URL comes from `src/core/config` (and `.env`). Request interceptor adds `Authorization: Bearer` and `locale`; response interceptor handles 401 (e.g. logout).
- **Redux**: Slices live under `src/core/store/<domain>/` (e.g. `app`, `user`). Persist whitelist controls what is saved to AsyncStorage.

## SOLID mapping

- **SRP**: One domain per store folder; one primary concern per component file; theme split into colors, fonts, sizes, consts, styles.
- **OCP**: Extend by adding screens, slices, or routes without changing existing stack logic; extend theme by editing theme files.
- **DIP**: Core (API, store) does not depend on UI; screens depend on core via hooks/selectors; config abstracts environment.
