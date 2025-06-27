import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {ImageResources} from '../common/ImageResources.g';
import {CommonSizes} from '../core/theme/commonSizes';
import {screenWidth} from '../core/theme/commonStyles';
import {useTheme} from '../core/theme/ThemeProvider';
import {RootStackParamList} from './types';
import {useRTL} from '../common/localization/LocalizationProvider';
import {scaleWidth} from '../core/theme/scaling';
export function Header() {
  return (
    <View style={styles.headerBase}>
      <Image source={ImageResources.light_header_logo} style={styles.logo} />
    </View>
  );
}

export function HeaderBack({onPress}: {onPress: () => void}) {
  return (
    <View style={styles.headerWithBack}>
      <BackButton onPress={onPress} />
      <Image source={ImageResources.light_header_logo} style={styles.logo} />
      <View style={{width: 40}} />
    </View>
  );
}

export function HeaderButton({onPress}: {onPress: () => void}) {
  return (
    <View style={styles.headerWithBack}>
      <BackButton onPress={onPress} />
      <View style={styles.logo} />
      <View style={{width: 40}} />
    </View>
  );
}

export function HomeHeader({onPress}: {onPress: () => void}) {
  return (
    <View style={styles.headerWithBack}>
      <RefreshButton onPress={onPress} />
      <Image source={ImageResources.light_header_logo} style={styles.logo} />
      <View style={{width: 40}} />
    </View>
  );
}

export function WebViewHeader({
  navigation,
}: {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}) {
  return (
    <View style={styles.webViewHeader}>
      {/* <BackButton navigation={navigation} /> */}
    </View>
  );
}

function BackButton({onPress}: {onPress: () => void}) {
  const {theme} = useTheme();
  const isRTL = useRTL();
  return (
    <TouchableOpacity style={styles.backButton} onPressIn={onPress}>
      <Image
        tintColor={theme.colors.tintColor}
        style={{
          ...styles.backIcon,
          transform: [{rotate: isRTL ? '180deg' : '0deg'}],
        }}
        source={ImageResources.arrow_left}
      />
    </TouchableOpacity>
  );
}

function RefreshButton({onPress}: {onPress: () => void}) {
  const {theme} = useTheme();
  return (
    <TouchableOpacity style={styles.backButton} onPressIn={onPress}>
      <Image
        tintColor={theme.colors.tintColor}
        style={styles.backIcon}
        source={ImageResources.repeat}
      />
    </TouchableOpacity>
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
    paddingHorizontal: CommonSizes.spacing.large,
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
