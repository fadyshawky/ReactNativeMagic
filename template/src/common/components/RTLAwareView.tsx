import React from 'react';
import {
  View,
  ViewProps,
  StyleSheet,
  TextStyle,
  ViewStyle,
  FlexStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {useRTL} from '../localization/LocalizationProvider';

interface RTLAwareViewProps extends ViewProps {
  style?: ViewStyle | ViewStyle[];
  children: React.ReactNode;
}

interface RTLAwareTouchableOpacityProps extends TouchableOpacityProps {
  style?: ViewStyle | ViewStyle[];
  children: React.ReactNode;
}

/**
 * A View component that automatically adjusts its layout for RTL languages
 * It flips certain style properties like flexDirection, textAlign, etc.
 */
export const RTLAwareView: React.FC<RTLAwareViewProps> = ({
  style,
  children,
  ...props
}) => {
  const isRTL = useRTL();

  // Convert style array to a single object
  const flattenedStyle = StyleSheet.flatten(style || {});

  // Create RTL-aware styles
  const rtlStyle: ViewStyle = {};

  // Handle flexDirection
  if (flattenedStyle.flexDirection === 'row') {
    rtlStyle.flexDirection = isRTL ? 'row-reverse' : 'row';
  } else if (flattenedStyle.flexDirection === 'row-reverse') {
    rtlStyle.flexDirection = isRTL ? 'row' : 'row-reverse';
  }

  // Handle text alignment
  if ((flattenedStyle as TextStyle).textAlign === 'left') {
    (rtlStyle as TextStyle).textAlign = isRTL ? 'right' : 'left';
  } else if ((flattenedStyle as TextStyle).textAlign === 'right') {
    (rtlStyle as TextStyle).textAlign = isRTL ? 'left' : 'right';
  }

  // Handle padding and margin
  if (flattenedStyle.paddingStart !== undefined) {
    rtlStyle.paddingLeft = isRTL ? undefined : flattenedStyle.paddingStart;
    rtlStyle.paddingRight = isRTL ? flattenedStyle.paddingStart : undefined;
    rtlStyle.paddingStart = undefined;
  }

  if (flattenedStyle.paddingEnd !== undefined) {
    rtlStyle.paddingRight = isRTL ? undefined : flattenedStyle.paddingEnd;
    rtlStyle.paddingLeft = isRTL ? flattenedStyle.paddingEnd : undefined;
    rtlStyle.paddingEnd = undefined;
  }

  if (flattenedStyle.marginStart !== undefined) {
    rtlStyle.marginLeft = isRTL ? undefined : flattenedStyle.marginStart;
    rtlStyle.marginRight = isRTL ? flattenedStyle.marginStart : undefined;
    rtlStyle.marginStart = undefined;
  }

  if (flattenedStyle.marginEnd !== undefined) {
    rtlStyle.marginRight = isRTL ? undefined : flattenedStyle.marginEnd;
    rtlStyle.marginLeft = isRTL ? flattenedStyle.marginEnd : undefined;
    rtlStyle.marginEnd = undefined;
  }

  return (
    <View style={[style, rtlStyle]} {...props}>
      {children}
    </View>
  );
};

export const RTLAwareTouchableOpacity: React.FC<
  RTLAwareTouchableOpacityProps
> = ({style, children, ...props}) => {
  const isRTL = useRTL();

  // Convert style array to a single object
  const flattenedStyle = StyleSheet.flatten(style || {});

  // Create RTL-aware styles
  const rtlStyle: ViewStyle = {};

  // Handle flexDirection
  if (flattenedStyle.flexDirection === 'row') {
    rtlStyle.flexDirection = isRTL ? 'row-reverse' : 'row';
  } else if (flattenedStyle.flexDirection === 'row-reverse') {
    rtlStyle.flexDirection = isRTL ? 'row' : 'row-reverse';
  }

  // Handle text alignment
  if ((flattenedStyle as TextStyle).textAlign === 'left') {
    (rtlStyle as TextStyle).textAlign = isRTL ? 'right' : 'left';
  } else if ((flattenedStyle as TextStyle).textAlign === 'right') {
    (rtlStyle as TextStyle).textAlign = isRTL ? 'left' : 'right';
  }

  // Handle padding and margin
  if (flattenedStyle.paddingStart !== undefined) {
    rtlStyle.paddingLeft = isRTL ? undefined : flattenedStyle.paddingStart;
    rtlStyle.paddingRight = isRTL ? flattenedStyle.paddingStart : undefined;
    rtlStyle.paddingStart = undefined;
  }

  if (flattenedStyle.paddingEnd !== undefined) {
    rtlStyle.paddingRight = isRTL ? undefined : flattenedStyle.paddingEnd;
    rtlStyle.paddingLeft = isRTL ? flattenedStyle.paddingEnd : undefined;
    rtlStyle.paddingEnd = undefined;
  }

  if (flattenedStyle.marginStart !== undefined) {
    rtlStyle.marginLeft = isRTL ? undefined : flattenedStyle.marginStart;
    rtlStyle.marginRight = isRTL ? flattenedStyle.marginStart : undefined;
    rtlStyle.marginStart = undefined;
  }

  if (flattenedStyle.marginEnd !== undefined) {
    rtlStyle.marginRight = isRTL ? undefined : flattenedStyle.marginEnd;
    rtlStyle.marginLeft = isRTL ? flattenedStyle.marginEnd : undefined;
    rtlStyle.marginEnd = undefined;
  }

  return (
    <TouchableOpacity style={[style, rtlStyle]} {...props}>
      {children}
    </TouchableOpacity>
  );
};

/**
 * A Text component that automatically adjusts its layout for RTL languages
 */
export const rtlStyles = (isRTL: boolean) => ({
  // Text alignment
  textLeft: {
    textAlign: isRTL ? 'right' : 'left',
  } as TextStyle,
  textRight: {
    textAlign: isRTL ? 'left' : 'right',
  } as TextStyle,

  // Flex direction
  row: {
    flexDirection: isRTL ? 'row-reverse' : 'row',
  } as FlexStyle,
  rowReverse: {
    flexDirection: isRTL ? 'row' : 'row-reverse',
  } as FlexStyle,

  // Alignment
  alignStart: {
    alignItems: isRTL ? 'flex-end' : 'flex-start',
  } as FlexStyle,
  alignEnd: {
    alignItems: isRTL ? 'flex-start' : 'flex-end',
  } as FlexStyle,

  // Justify content
  justifyStart: {
    justifyContent: isRTL ? 'flex-end' : 'flex-start',
  } as FlexStyle,
  justifyEnd: {
    justifyContent: isRTL ? 'flex-start' : 'flex-end',
  } as FlexStyle,
});
