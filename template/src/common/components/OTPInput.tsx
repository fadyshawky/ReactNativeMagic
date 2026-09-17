import React, {useRef} from 'react';
import {
  StyleSheet,
  TextInputInstance,
  TextInputKeyPressEvent,
  ViewStyle,
} from 'react-native';
import {useTheme} from '../../core/theme/ThemeProvider';
import {CommonSizes} from '../../core/theme/commonSizes';
import {PrimaryTextInput} from './PrimaryTextInput';
import {scaleWidth} from '../../core/theme/scaling';
import {RTLAwareView} from './RTLAwareView';

interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string | null;
  style?: ViewStyle;
}

export const OTPInput: React.FC<OTPInputProps> = ({
  value,
  onChange,
  error: _error, // rendered by the screen below the row
  style,
}) => {
  const {theme} = useTheme();
  const inputRefs = useRef<Array<TextInputInstance | null>>([]);

  const handleChange = (text: string, index: number) => {
    const newValue = value.split('');
    newValue[index] = text;
    const finalValue = newValue.join('');
    onChange(finalValue);

    if (text.length > 0 && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: TextInputKeyPressEvent, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && index > 0 && !value[index]) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <RTLAwareView style={{...styles.container, ...style}}>
      {[0, 1, 2, 3, 4, 5].map(index => (
        <PrimaryTextInput
          width={scaleWidth(78)}
          key={index}
          inputRef={ref => (inputRefs.current[index] = ref)}
          style={[styles.input, theme.text.amount, styles.digit]}
          maxLength={1}
          keyboardType="number-pad"
          value={value[index] || ''}
          onChangeText={text => handleChange(text, index)}
          onKeyPress={e => handleKeyPress(e, index)}
          selectTextOnFocus
        />
      ))}
    </RTLAwareView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: CommonSizes.spacing.small,
    paddingHorizontal: CommonSizes.spacing.large,
  },
  input: {
    flex: 1,
    textAlign: 'center',
    paddingStart: 0,
    paddingEnd: 0,
  },
  digit: {fontSize: 20, lineHeight: undefined},
});
