# Changelog

All notable changes to this project will be documented in this file.

## [1.0.7] - 2024-12-27

### Changed
- Enhanced UI components for better user experience:
  - Improved form input styling
  - Updated button states for better feedback
  - Refined error message displays
  - Added loading spinners for async actions
  - Standardized form layouts across authentication flows

### Added
- Responsive design improvements for mobile devices
- Visual feedback for form validation states
- Transition animations for state changes
- Consistent error message styling

## [1.0.6] - 2024-12-25

### Added
- Added missing password reset handlers (`resetPasswordErrorHandler` and `resetPasswordLoadingHandler`) to user slice
- Added password reset flow with the following states:
  - Loading state during password reset request
  - Error handling for failed password reset attempts
  - Success handling for completed password reset
- Added complete user registration flow:
  - User input validation
  - Registration request handling
  - Success state with automatic login
  - Error handling for failed registration attempts
  - Loading states during registration process

### Fixed
- Fixed password reset error handling in user slice
- Resolved undefined handler errors in password reset flow
- Improved registration flow error handling

## [1.0.5] - 2024-12-23

### Fixed
- Resolved Android build configuration issues
- Fixed package dependencies setup and initialization
- Optimized Gradle build settings for Android
- Fixed iOS permissions configuration

## [1.0.4] - 2024-12-22

### Fixed
- Updated React Native Screens configuration for React Navigation v7 compatibility
- Fixed navigation theme implementation for Poppins font family

### Changed
- Simplified navigation container theme configuration
- Removed deprecated font configurations

## [1.0.3] - 2024-12-21

### Added
- Enhanced template structure with additional hooks and utilities
- Added new dependencies:
  - @react-native-camera-roll/camera-roll ^7.9.0
  - @react-native-community/datetimepicker ^8.2.0
  - @react-native-community/image-editor ^4.2.1
  - @react-native-community/netinfo ^11.4.1
  - @react-native-community/slider ^4.5.5
  - @shopify/flash-list ^1.7.2

### Updated
- Updated React Navigation to v7
- Updated dependencies to latest versions:
  - @react-navigation/bottom-tabs ^7.2.0
  - @react-navigation/drawer ^7.1.1
  - @react-navigation/material-top-tabs ^7.1.0
  - @react-navigation/native ^7.0.14
  - @react-navigation/native-stack ^7.2.0
  - @reduxjs/toolkit ^2.5.0

### Changed
- Improved project structure and organization
- Enhanced iOS configuration
- Updated Android Gradle configuration

## [1.0.2] - 2024-12-20

### Added
- Initial template setup with TypeScript support
- Basic navigation structure
- Redux integration with persist storage
- Common hooks and utilities

### Changed
- Updated project dependencies
- Improved documentation

## [1.0.1] - 2024-12-19

### Added
- Basic React Native template structure
- Essential project configuration
- Initial README documentation

## [1.0.0] - 2024-12-18

### Added
- Initial release
- Basic project setup
- Core dependencies 