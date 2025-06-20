import React, {FC, memo} from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors} from '../../core/theme/colors';
import {CommonSizes} from '../../core/theme/commonSizes';
import {CommonStyles} from '../../core/theme/commonStyles';
import {localization} from '../localization/localization';

interface IProps {
  onPress?: () => void;
  errorText?: string | null;
}

export const TryAgain: FC<IProps> = memo(
  ({onPress, errorText = localization.errors.unknownErrorHasOccurred}) => {
    return (
      <View
        style={{...CommonStyles.flexCenter, backgroundColor: 'transparent'}}>
        <Text style={styles.title}>{errorText}</Text>
        {onPress != null && (
          <TouchableOpacity onPressIn={onPress}>
            <Text style={styles.description}>
              {localization.errors.tryAgain}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  title: {
    ...CommonStyles.normalText,
    textAlign: 'center',
    marginBottom: CommonSizes.spacing.extraSmall,
  } as TextStyle,
  description: {
    ...CommonStyles.normalText,
    color: Colors.blueNormalActive,
    textAlign: 'center',
    textDecorationLine: 'underline',
  } as TextStyle,
});
