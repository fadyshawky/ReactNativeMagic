import React, {FC, memo} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {KeyboardAwareScrollViewProps} from 'react-native-keyboard-aware-scroll-view';
import {useTheme} from '../../core/theme/ThemeProvider';
import {Container} from './Container';

interface BackgroundProps extends Omit<
  KeyboardAwareScrollViewProps,
  'contentContainerStyle'
> {
  children: React.ReactNode;
  useSafeArea?: boolean;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  withoutPadding?: boolean;
  withoutScroll?: boolean;
  withoutBackgroundImage?: boolean;
}

export const Background: FC<BackgroundProps> = memo(
  ({
    children,
    useSafeArea = true,
    style,
    contentContainerStyle,
    withoutPadding = false,
    withoutScroll = false,
    ...scrollViewProps
  }) => {
    const {theme} = useTheme();

    const content = (
      <Container
        useSafeArea={useSafeArea}
        style={style}
        contentContainerStyle={contentContainerStyle}
        withoutPadding={withoutPadding}
        withoutScroll={withoutScroll}
        {...scrollViewProps}>
        {children}
      </Container>
    );

    return (
      <View
        style={[styles.container, {backgroundColor: theme.colors.bgCanvas}]}>
        {content}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
