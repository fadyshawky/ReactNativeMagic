import React from 'react';
import {Text, TextProps, StyleSheet, TextStyle} from 'react-native';
import {useRTL} from '../localization/LocalizationProvider';

interface RTLAwareTextProps extends TextProps {
  style?: TextStyle | TextStyle[];
  children: React.ReactNode;
}

/**
 * A Text component that automatically adjusts its layout for RTL languages
 * It flips text alignment and other text-specific properties
 */
export const RTLAwareText: React.FC<RTLAwareTextProps> = ({
  style,
  children,
  ...props
}) => {
  const isRTL = useRTL();

  // Convert style array to a single object
  const flattenedStyle = StyleSheet.flatten(style || {});

  // Create RTL-aware styles
  const rtlStyle: TextStyle = {};

  // Handle text alignment
  if (flattenedStyle.textAlign === 'left') {
    rtlStyle.textAlign = isRTL ? 'right' : 'left';
  } else if (flattenedStyle.textAlign === 'right') {
    rtlStyle.textAlign = isRTL ? 'left' : 'right';
  }

  // Handle writing direction
  rtlStyle.writingDirection = isRTL ? 'rtl' : 'ltr';

  return (
    <Text style={[style, rtlStyle]} {...props}>
      {children}
    </Text>
  );
};
