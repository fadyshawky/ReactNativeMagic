import React from 'react';
import {Image, View} from 'react-native';
import {CommonStyles} from '../../core/theme/commonStyles';

export const LoadingComponent = () => {
  return (
    <View style={CommonStyles.flexCenter}>
      <Image resizeMode="cover" style={{flex: 1}} source={0} />
    </View>
  );
};
