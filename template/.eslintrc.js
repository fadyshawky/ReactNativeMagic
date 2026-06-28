module.exports = {
  root: true,
  extends: '@react-native',
  // Register eslint-plugin-import explicitly: @react-native's eslintrc config
  // references import/* rules but doesn't register the plugin (it's flat-config
  // first), which otherwise yields "Definition for rule not found".
  plugins: ['import'],
  // Generated files (e.g. ImageResources.g.ts) aren't linted.
  ignorePatterns: ['**/*.g.ts'],
  rules: {
    // Surface these as warnings instead of hard errors (mostly cleanup nits).
    '@typescript-eslint/no-unused-vars': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    'import/no-unassigned-import': 'off',
    'import/no-unused-modules': 'off',
    'import/no-default-export': 'off',
  },
};
