import React, {FC, memo} from 'react';
import {ImageBackground, StyleSheet, View, ViewStyle} from 'react-native';
import {KeyboardAwareScrollViewProps} from 'react-native-keyboard-aware-scroll-view';
import {useTheme} from '../../core/theme/ThemeProvider';
import {Container} from './Container';

interface BackgroundProps
  extends Omit<KeyboardAwareScrollViewProps, 'contentContainerStyle'> {
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
    withoutBackgroundImage = false,
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

    if (withoutBackgroundImage) {
      return (
        <View
          style={[
            styles.container,
            {backgroundColor: theme.colors.background_2},
          ]}>
          {content}
        </View>
      );
    }

    return (
      <View
        style={[
          styles.container,
          {backgroundColor: theme.colors.background_2},
        ]}>
        <ImageBackground source={0} style={styles.container}>
          {content}
        </ImageBackground>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
