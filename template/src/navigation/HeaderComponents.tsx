import React from 'react';
import {StyleSheet, View} from 'react-native';
import {CommonSizes} from '../core/theme/commonSizes';
import {screenWidth} from '../core/theme/commonStyles';
import {scaleWidth} from '../core/theme/scaling';

export function HeaderButton({onPress}: {onPress: () => void}) {
  return (
    <View style={styles.headerWithBack}>
      <View style={styles.logo} />
      <View style={{width: 40}} />
    </View>
  );
}

const styles = StyleSheet.create({
  headerBase: {
    width: '100%',
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  headerWithBack: {
    width: screenWidth,
    height: 80,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: scaleWidth(16),
  },
  webViewHeader: {
    width: '100%',
    height: 120,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: CommonSizes.spacing.lg,
    flexDirection: 'row',
  },
  titleContainer: {
    width: screenWidth,
    alignItems: 'center',
    position: 'absolute',
    zIndex: 0,
  },
  backButton: {
    width: 40,
    height: 40,
  },
  backIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    alignSelf: 'flex-start',
  },
  logo: {
    width: '50%',
    // height: 66,
    resizeMode: 'center',
  },
});
