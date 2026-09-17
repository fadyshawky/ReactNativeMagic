import React, {FC, memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ButtonType} from '../../../types';
import {CommonSizes} from '../../core/theme/commonSizes';
import {useTheme} from '../../core/theme/ThemeProvider';
import {localization} from '../localization/localization';
import {PrimaryButton} from './PrimaryButton';

interface IProps {
  onPress?: () => void;
  errorText?: string | null;
}

export const TryAgain: FC<IProps> = memo(
  ({onPress, errorText = localization.errors.unknownErrorHasOccurred}) => {
    const {theme} = useTheme();
    return (
      <View style={styles.container}>
        <Text style={[theme.text.body, styles.center]}>{errorText}</Text>
        {onPress != null && (
          <PrimaryButton
            label={localization.errors.tryAgain}
            type={ButtonType.outline}
            size="md"
            fullWidth={false}
            onPress={onPress}
          />
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: CommonSizes.layout.stack,
    padding: CommonSizes.spacing.xxLarge,
  },
  center: {textAlign: 'center'},
});
