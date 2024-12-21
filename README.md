# ReactNativeMagic

A modern, production-ready React Native template with best practices, common dependencies, and a scalable architecture.

## Requirements

- Node.js >= 14 ([Download](https://nodejs.org/en/download/))
- JDK >= 11 ([Download](https://www.oracle.com/java/technologies/downloads/))
- Ruby >= 2.7.5 (for iOS) ([Download](https://www.ruby-lang.org/en/downloads/))
- Xcode (for iOS) ([Mac App Store](https://apps.apple.com/us/app/xcode/id497799835))
- Android Studio (for Android) ([Download](https://developer.android.com/studio))

## Installation

```bash
npx @react-native-community/cli init YourAppName --template @fadyshawky/react-native-magic
cd YourAppName
```

For iOS, install pods:

```bash
cd ios && pod install && cd ..
```

## Project Structure

```
YourAppName/
├── src/
│   ├── components/       # Reusable UI components
│   ├── screens/         # Screen components
│   ├── navigation/      # Navigation configurations
│   ├── services/        # API services and other external services
│   ├── store/          # State management
│   │   ├── slices/     # Redux slices
│   │   └── index.ts    # Store configuration
│   ├── theme/          # Theme configurations
│   ├── utils/          # Utility functions
│   └── types/          # TypeScript type definitions
├── android/
├── ios/
└── ...
```

## Features

### 1. Type Safety

- Full TypeScript support
- Pre-configured tsconfig.json
- Type definitions for all components

### 2. Navigation

- React Navigation v6
- Type-safe navigation
- Bottom tabs setup
- Stack navigation setup

Documentation: [React Navigation](https://reactnavigation.org/docs/getting-started)

### 3. State Management

- Redux Toolkit
- Async storage integration
- Predefined store setup

Documentation: [Redux Toolkit](https://redux-toolkit.js.org/introduction/getting-started)

### 4. Environment Variables

- React Native Config integration
- Secure environment configuration
- Type-safe environment variables

Documentation: [React Native Config](https://github.com/luggit/react-native-config)

### 5. Styling

- React Native Paper
- Custom theming system
- Dark mode support

Documentation: [React Native Paper](https://callstack.github.io/react-native-paper/)

### 6. Testing

- Jest configuration
- React Native Testing Library
- Example tests included

Documentation:

- [Jest](https://jestjs.io/docs/getting-started)
- [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)

## Available Scripts

```bash
# Start the Metro bundler
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run tests
npm test

# Lint code
npm run lint

# Type checking
npm run typescript
```

## Dependencies

### Production Dependencies

```json
{
  "@react-navigation/bottom-tabs": "^6.x",
  "@react-navigation/native": "^6.x",
  "@react-navigation/native-stack": "^6.x",
  "@reduxjs/toolkit": "^1.x",
  "react-native-paper": "^5.x",
  "react-native-safe-area-context": "^4.x",
  "react-native-screens": "^3.x",
  "@react-native-async-storage/async-storage": "^1.x",
  "react-native-config": "^1.x"
}
```

### Development Dependencies

```json
{
  "@testing-library/react-native": "^11.x",
  "@types/jest": "^29.x",
  "@types/react": "^18.x",
  "typescript": "^4.x",
  "jest": "^29.x"
}
```

## Common Issues & Solutions

### iOS Build Issues

1. Pod installation fails:

```bash
cd ios
pod deintegrate
pod install
```

2. Clean build:

```bash
cd ios
xcodebuild clean
cd ..
npm run ios
```

### Android Build Issues

1. Gradle issues:

```bash
cd android
./gradlew clean
cd ..
npm run android
```

2. SDK location issues:
   Create a `local.properties` file in the android folder with your SDK path:

```properties
sdk.dir=/Users/USERNAME/Library/Android/sdk
```

## Customization

### 1. Changing Theme

Edit `src/theme/index.ts`:

```typescript
export const theme = {
  colors: {
    primary: "#YOUR_COLOR",
    // ...
  },
  // ...
};
```

### 2. Adding New Navigation Screens

1. Create screen in `src/screens`
2. Add to navigation stack in `src/navigation`
3. Update types in `src/types/navigation.ts`

### 3. Environment Variables

1. Create `.env` file in root directory:

```env
API_URL=https://api.example.com
ENV=development
```

2. Access variables in your code:

```typescript
import Config from "react-native-config";

console.log(Config.API_URL);
```

Note: Remember to add `.env` to your `.gitignore` file and provide a `.env.example` template.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Useful Links

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [React Navigation Documentation](https://reactnavigation.org/docs/getting-started)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/introduction/getting-started)
- [React Native Paper Documentation](https://callstack.github.io/react-native-paper/)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Support

If you find this template helpful, consider buying me a coffee! ☕️

<a href="https://www.buymeacoffee.com/fadytshawke" target="_blank">
  <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="60px" width="217px">
</a>

## Author

Fady Shawky

- GitHub: [@fadyshawky](https://github.com/fadyshawky)

## Acknowledgments

- React Native Team
- React Navigation Team
- All contributors who help maintain this template
