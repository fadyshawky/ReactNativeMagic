import React, {forwardRef} from 'react';
import {
  StyleSheet,
  ViewStyle,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  View,
  ImageBackground,
  ImageSourcePropType,
} from 'react-native';
import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from 'react-native-keyboard-aware-scroll-view';
import {useTheme} from '../../core/theme/ThemeProvider';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {ImageResources} from '../ImageResources.g';

interface ContainerProps extends Partial<KeyboardAwareScrollViewProps> {
  children: React.ReactNode;
  useSafeArea?: boolean;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  withoutPadding?: boolean;
  withoutScroll?: boolean;
  backgroundColor?: string;
  withoutBackgroundImage?: boolean;
  backgroundImage?: ImageSourcePropType;
  extendedBackground?: boolean;
}

export const Container = forwardRef<KeyboardAwareScrollView, ContainerProps>(
  (
    {
      children,
      useSafeArea = true,
      style,
      contentContainerStyle,
      withoutPadding = false,
      withoutScroll = false,
      backgroundColor,
      withoutBackgroundImage = false,
      backgroundImage = 0,
      extendedBackground = false,
      ...scrollViewProps
    },
    ref,
  ) => {
    const {theme} = useTheme();
    const insets = useSafeAreaInsets();
    const Wrapper = useSafeArea ? SafeAreaView : View;
    const bgColor = backgroundColor || theme.colors.background;

    const content = (
      <Wrapper
        style={[
          styles.container,
          !withoutPadding && styles.padding,
          style,
          extendedBackground && {
            marginTop: -insets.top,
            paddingTop: insets.top,
          },
        ]}>
        {children}
      </Wrapper>
    );

    const wrappedContent = withoutBackgroundImage ? (
      <View style={[styles.container, {backgroundColor: bgColor}]}>
        {content}
      </View>
    ) : (
      <ImageBackground
        source={backgroundImage}
        style={[
          styles.container,
          extendedBackground && {
            marginTop: -insets.top,
          },
        ]}
        resizeMode="cover">
        {content}
      </ImageBackground>
    );

    if (withoutScroll) {
      return (
        <KeyboardAvoidingView
          style={[
            styles.container,
            {backgroundColor: bgColor},
            extendedBackground && {
              marginTop: -insets.top,
            },
          ]}
          behavior={undefined}
          enabled>
          {wrappedContent}
        </KeyboardAvoidingView>
      );
    }

    return (
      <KeyboardAwareScrollView
        ref={ref}
        style={[
          styles.container,
          {backgroundColor: bgColor},
          extendedBackground && {
            marginTop: -insets.top,
          },
        ]}
        contentContainerStyle={[
          styles.contentContainer,
          !withoutPadding && styles.padding,
          contentContainerStyle,
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        enableOnAndroid
        enableResetScrollToCoords={false}
        extraScrollHeight={20}
        keyboardOpeningTime={0}
        keyboardDismissMode="on-drag"
        enableAutomaticScroll={true}
        {...scrollViewProps}>
        {wrappedContent}
      </KeyboardAwareScrollView>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  padding: {
    padding: 16, // Using a fixed value here as theme isn't available in StyleSheet
  },
});
