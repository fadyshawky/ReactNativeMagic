# Best practices

## Code style

- Use **TypeScript** strictly; avoid `any` where possible.
- Use typed Redux: `useAppSelector`, `useAppDispatch`, and `createAppAsyncThunk` with `RootState` / `AppDispatch`.
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

## Security

- Do not commit secrets; use `.env` for API keys and base URL (and add `.env` to `.gitignore`).
- Persist only necessary fields (use the persist whitelist in the store).

## LTS / upgrades

- The template targets **Node >= 20** and current stable **React Native** (e.g. 0.84.x).
- To upgrade React Native, use [React Native Upgrade Helper](https://react-native-community.github.io/upgrade-helper/): select your current version and the target version, then apply the suggested changes to `package.json`, `android/`, `ios/`, and config files.
