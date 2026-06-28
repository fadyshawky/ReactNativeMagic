import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {CommonStyles} from '../../core/theme/commonStyles';

export const LoadingComponent = () => {
  return (
    <View style={CommonStyles.flexCenter}>
      <Image resizeMode="cover" style={styles.image} source={0} />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
});
