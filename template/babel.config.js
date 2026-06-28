module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        alias: {
          '@core': './src/core',
          '@common': './src/common',
          '@navigation': './src/navigation',
          '@screens': './src/screens',
          '@sheetManager': './src/sheetManager',
          '@design-system': './src/design-system',
          '@types': './src/types',
          '@utils': './src/utils',
        },
      },
    ],
    'react-native-worklets/plugin',
  ],
};
