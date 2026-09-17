import React, {forwardRef} from 'react';
import {
  Image,
  ImageSourcePropType,
  KeyboardAvoidingView,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CommonSizes} from '../../core/theme/commonSizes';
import {useTheme} from '../../core/theme/ThemeProvider';

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
      ...scrollViewProps
    },
    ref,
  ) => {
    const {theme} = useTheme();
    const Wrapper = useSafeArea ? SafeAreaView : View;
    const bgColor = backgroundColor || theme.colors.bgCanvas;

    const content = (
      <Wrapper
        style={[
          styles.container,
          styles.gap,
          !withoutPadding && styles.padding,
          style,
        ]}>
        {children}
      </Wrapper>
    );

    const wrappedContent = (
      <View style={[styles.container, {backgroundColor: bgColor}]}>
        {!withoutBackgroundImage && backgroundImage ? (
          <Image
            source={backgroundImage}
            style={StyleSheet.absoluteFill}
            resizeMode="cover"
          />
        ) : null}
        {content}
      </View>
    );

    if (withoutScroll) {
      return (
        <KeyboardAvoidingView
          style={[styles.container, {backgroundColor: bgColor}]}
          behavior={undefined}
          enabled>
          {wrappedContent}
        </KeyboardAvoidingView>
      );
    }

    return (
      <KeyboardAwareScrollView
        ref={ref}
        style={[styles.container, {backgroundColor: bgColor}]}
        contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
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
  // Screen rhythm: children are the top-level blocks, `section` apart. Pass
  // `style` to change the gutter or gap for a whole screen.
  padding: {
    paddingHorizontal: CommonSizes.layout.gutter,
    paddingTop: CommonSizes.layout.gutter,
    paddingBottom: CommonSizes.layout.screenBottom,
  },
  gap: {gap: CommonSizes.layout.section},
});
