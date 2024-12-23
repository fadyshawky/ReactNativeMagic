import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {CommonSizes} from '../core/theme/commonSizes';
import {CommonStyles, screenWidth} from '../core/theme/commonStyles';
import {RootStackParamList} from './types';

export function Header({title}: {title: string}) {
  return (
    <View style={styles.headerBase}>
      <Text style={CommonStyles.h2_regular}>{title}</Text>
    </View>
  );
}

export function HeaderBack({
  title,
  navigation,
}: {
  title: string;
  navigation: NativeStackNavigationProp<RootStackParamList>;
}) {
  return (
    <View style={styles.headerWithBack}>
      <View style={styles.titleContainer}>
        <Text style={CommonStyles.h2_regular}>{title}</Text>
      </View>
      <BackButton navigation={navigation} />
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
      <BackButton navigation={navigation} />
    </View>
  );
}

function BackButton({
  navigation,
}: {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}) {
  return (
    <TouchableOpacity
      style={styles.backButton}
      onPress={() => navigation.pop()}>
      <Image style={styles.backIcon} source={0} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  headerBase: {
    width: '100%',
    height: 80,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 25,
  },
  headerWithBack: {
    width: '100%',
    height: 80,
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: CommonSizes.spacing.large,
    flexDirection: 'row',
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
    width: 60,
    height: 40,
    justifyContent: 'flex-end',
  },
  backIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});
