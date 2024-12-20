import React from 'react';
import {Image, View} from 'react-native';
import {CommonStyles} from '../../core/theme/commonStyles';
import {ImageResources} from '../ImageResources.g';

export const LoadingComponent = () => {
  return (
    <View style={CommonStyles.flexCenter}>
      <Image
        resizeMode='cover'
        style={{flex: 1}}
        source={ImageResources.splash}
      />
    </View>
  );
};
