/**
 * @format
 *
 * Smoke tests for the template's core helpers.
 *
 * Note: we intentionally do NOT render <App /> here. Mounting the full app pulls
 * in @gorhom/bottom-sheet → react-native-reanimated 4 → react-native-worklets,
 * whose native module can't initialize under plain Jest. Component/render tests
 * that touch reanimated, gesture-handler or bottom-sheet need a richer setup
 * (e.g. @testing-library/react-native plus the reanimated jest mock) — add that
 * per-test when you need it. These unit tests keep `npm test` fast and reliable.
 */
import {newState} from '../src/common/utils/newState';
import {ensureString} from '../src/core/utils/stringUtils';

describe('newState', () => {
  it('merges a partial patch into a fresh copy without mutating the original', () => {
    const original = {a: 1, b: 2};
    const next = newState(original, {b: 3});

    expect(next).toEqual({a: 1, b: 3});
    expect(original).toEqual({a: 1, b: 2});
    expect(next).not.toBe(original);
  });
});

describe('ensureString', () => {
  it('passes strings through and coerces everything else to a string', () => {
    expect(ensureString('hello')).toBe('hello');
    expect(ensureString(42)).toBe('42');
    expect(ensureString(null)).toBe('');
    expect(ensureString(undefined)).toBe('');
    expect(ensureString({message: 'oops'})).toBe('oops');
  });
});
