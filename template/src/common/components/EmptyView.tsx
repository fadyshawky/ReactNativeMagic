import React, {FC, memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {CommonSizes} from '../../core/theme/commonSizes';
import {useTheme} from '../../core/theme/ThemeProvider';

interface IProps {
  title: string;
  description: string;
}

export const EmptyView: FC<IProps> = memo(({title, description}) => {
  const {theme} = useTheme();
  return (
    <View style={styles.container}>
      <Text style={[theme.text.h4, styles.center]}>{title}</Text>
      <Text style={[theme.text.bodySm, styles.center]}>{description}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: CommonSizes.layout.related,
    padding: CommonSizes.spacing.xxLarge,
  },
  center: {textAlign: 'center'},
});
