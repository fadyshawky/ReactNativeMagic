import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Fonts} from '../../core/theme/fonts';
import {CommonSizes} from '../../core/theme/commonSizes';

export const NetworkBanner = () => {
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      const connected = !!state.isConnected && state.isInternetReachable !== false;
      setOffline(!connected);
    });
    NetInfo.fetch().then(state => {
      const connected = !!state.isConnected && state.isInternetReachable !== false;
      setOffline(!connected);
    });
    return unsubscribe;
  }, []);

  if (!offline) return null;

  return (
    <View style={styles.banner} pointerEvents="none">
      <Text style={styles.text}>No internet connection</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#D32F2F',
    paddingVertical: 8,
    alignItems: 'center',
    zIndex: 9999,
  },
  text: {
    color: '#fff',
    fontFamily: Fonts.bold,
    fontSize: CommonSizes.font.bodySmall,
  },
});
