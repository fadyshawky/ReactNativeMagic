/**
 * StatusBar wrapper that avoids deprecated Android APIs when using edge-to-edge.
 * On Android 15+ with edge-to-edge, Window.setStatusBarColor/setNavigationBarColor
 * are deprecated. Passing backgroundColor on Android triggers those APIs, so we
 * only pass it on iOS.
 */
import React from 'react';
import {Platform, StatusBar, StatusBarProps} from 'react-native';

type AppStatusBarProps = Omit<StatusBarProps, 'backgroundColor'> & {
  backgroundColor?: string;
};

export function AppStatusBar({
  backgroundColor,
  ...rest
}: AppStatusBarProps): React.JSX.Element {
  return (
    <StatusBar
      {...rest}
      backgroundColor={Platform.OS === 'ios' ? backgroundColor : undefined}
    />
  );
}
