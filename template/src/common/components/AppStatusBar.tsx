/**
 * Status bar wrapper.
 * - iOS: status bar appearance is view-controller based (Info.plist). The
 *   `UIApplication` status bar APIs React Native's `StatusBar` calls are no-ops
 *   on iOS 27 and log deprecations, so nothing renders here: the style follows
 *   the window's light/dark appearance, which `ThemeProvider` keeps in step
 *   with the app theme.
 * - Android: edge-to-edge (no background colour); `barStyle` picks icon colour.
 */
import React from 'react';
import {Platform, StatusBar, StatusBarProps} from 'react-native';

export function AppStatusBar(props: StatusBarProps): React.JSX.Element | null {
  return Platform.OS === 'android' ? <StatusBar {...props} /> : null;
}
