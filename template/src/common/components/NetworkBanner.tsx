import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {CommonSizes} from '../../core/theme/commonSizes';
import {useTheme} from '../../core/theme/ThemeProvider';

export const NetworkBanner = () => {
  const {theme} = useTheme();
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      const connected =
        !!state.isConnected && state.isInternetReachable !== false;
      setOffline(!connected);
    });
    NetInfo.fetch().then(state => {
      const connected =
        !!state.isConnected && state.isInternetReachable !== false;
      setOffline(!connected);
    });
    return unsubscribe;
  }, []);

  if (!offline) return null;

  return (
    <View
      style={[styles.banner, {backgroundColor: theme.colors.danger}]}
      pointerEvents="none"
      accessibilityLiveRegion="polite">
      <Text style={[theme.text.label, {color: theme.colors.textOnAccent}]}>
        No internet connection
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: CommonSizes.spacing.medium,
    alignItems: 'center',
    zIndex: 9999,
  },
});
