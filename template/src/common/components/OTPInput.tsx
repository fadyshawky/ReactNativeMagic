import React, {useRef, useState} from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputKeyPressEventData,
  ViewStyle,
} from 'react-native';
import {useTheme} from '../../core/theme/ThemeProvider';
import {CommonSizes} from '../../core/theme/commonSizes';
import {scaleWidth} from '../../core/theme/scaling';
import {PrimaryTextInput} from './PrimaryTextInput';
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
  error,
  style,
}) => {
  const {theme} = useTheme();
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const [focused, setFocused] = useState<number>(-1);

  const handleChange = (text: string, index: number) => {
    const newValue = value.split('');
    newValue[index] = text;
    const finalValue = newValue.join('');
    onChange(finalValue);

    if (text.length > 0 && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => {
    if (e.nativeEvent.key === 'Backspace' && index > 0 && !value[index]) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleFocus = (index: number) => {
    setFocused(index);
  };

  const handleBlur = () => {
    setFocused(-1);
  };

  return (
    <RTLAwareView style={{...styles.container, ...style}}>
      {[0, 1, 2, 3, 4, 5].map(index => (
        <PrimaryTextInput
          width={scaleWidth(78)}
          key={index}
          inputRef={ref => (inputRefs.current[index] = ref)}
          style={[
            styles.input,
            {
              borderColor: error
                ? theme.colors.mutedLavender
                : focused === index
                ? theme.colors.indigoBlue
                : theme.colors.mutedLavender30,
              backgroundColor: theme.colors.backgroundOpacity,
            },
          ]}
          maxLength={1}
          keyboardType="number-pad"
          value={value[index] || ''}
          onChangeText={text => handleChange(text, index)}
          onKeyPress={e => handleKeyPress(e, index)}
          onFocus={() => handleFocus(index)}
          onBlur={handleBlur}
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
    height: CommonSizes.spacing.xxl,
    borderWidth: 1,
    borderRadius: CommonSizes.borderRadius.medium,
    textAlign: 'center',
  },
});
