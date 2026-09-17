# Best practices

## Code style

- Use **TypeScript** strictly; avoid `any` where possible.
- Use typed Redux: `useAppSelector`, `useAppDispatch`, and `createAppAsyncThunk` with `RootState` / `AppDispatch`.
- Follow the house slice pattern: a `newState` reducer helper, a `LoadState` enum for request status, and `createAsyncThunk` thunks that call the API helpers. The `categories` slice (`src/core/store/categories/`) is the reference.
- Use relative imports to match the existing code. Path aliases are configured but not used by the shipped `src/`.
- Run `npm run lint` and fix issues.

## Structure

- **Single responsibility**: One concern per module/folder; keep screens thin (logic in hooks or actions).
- Put shared UI in `src/common/components/`.
- Use the API helpers from `src/core/api` (get, post, put, deleteApi); do not create extra axios instances.

## Testing

- Use **Jest** and **React Native Testing Library** for unit and component tests.
- Add tests for store logic and important components; run `npm test`.

## Performance

- Avoid creating new objects/functions in render when they are passed as props to children.
- Use stable keys for list items.
- For heavy lists, use `src/common/components/FlatListWrapper.tsx` (FlashList-backed) and set `estimatedItemSize`; don't reintroduce a raw `FlatList`.

## Theming

- Change brand colors, fonts, and sizes only in `src/core/theme/` — keep the token keys stable so the rest of the app keeps working.
- Style with semantic tokens (`theme.colors.surfaceCard`, `borderDefault`, `textSecondary`, …), `theme.text.*` roles, `theme.shadows.*` and `CommonSizes` — never raw hex or ad-hoc font sizes.
- Follow the system's rules: a 1px border on every surface, one accent per screen, 6px-radius controls (no pill buttons), no gradients or glow, 48px touch targets on mobile, Geist Mono for numbers/IDs/amounts.
- Copy is sentence case and verb-first (“Delete item”, not “OK” / “Submit”); the mono `eyebrow` role is the only uppercase.
- The app follows the system color scheme by default; verify new screens in both light and dark.

## Security

- Do not commit secrets; use `.env` for API keys and base URL (and add `.env` to `.gitignore`).
- Persist only necessary fields (use the persist whitelist in the store).

## LTS / upgrades

- The template targets **Node >= 22.13** and **React Native 0.87.x** (React 19.2.x, TypeScript 6).
- To upgrade React Native, use [React Native Upgrade Helper](https://react-native-community.github.io/upgrade-helper/): select your current version and the target version, then apply the suggested changes to `package.json`, `android/`, `ios/`, and config files.
