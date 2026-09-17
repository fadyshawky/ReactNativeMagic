import React from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputInstance,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  StyleProp,
  Platform,
  KeyboardTypeOptions,
  TextInputProps,
  View,
} from 'react-native';
import {useTheme} from '../../core/theme/ThemeProvider';
import {
  useTranslation,
  useLocalization,
} from '../localization/LocalizationProvider';
import {inputTextAlign} from '../../core/theme/commonConsts';
import {CommonSizes} from '../../core/theme/commonSizes';
import {Icon} from './Icon';
import {RTLAwareView} from './RTLAwareView';
import {Languages} from '../localization/localization';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  onClear?: () => void;
  autoFocus?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder,
  style,
  inputStyle,
  onClear,
  autoFocus = false,
}) => {
  const {theme} = useTheme();
  const t = useTranslation();
  const {currentLanguage} = useLocalization();
  const isArabic = currentLanguage === Languages.ar;

  // Create a ref to the TextInput to control it programmatically if needed
  const inputRef = React.useRef<TextInputInstance>(null);

  const handleClear = () => {
    onChangeText('');
    if (onClear) {
      onClear();
    }
  };

  const containerStyle: ViewStyle = {
    backgroundColor: theme.colors.surfaceCard,
    borderColor: theme.colors.borderDefault,
    boxShadow: theme.shadows.xs,
  };

  // Set keyboard language specific properties
  const getKeyboardProps = (): Partial<TextInputProps> => {
    if (Platform.OS === 'ios') {
      // For iOS, we use primaryLanguage to hint at the keyboard language
      return {
        keyboardType: 'default' as KeyboardTypeOptions,
        textContentType: 'none',
        // primaryLanguage property is iOS specific but not directly supported by RN types
        // This custom property helps indicate preferred keyboard language to iOS
        ...(isArabic ? {primaryLanguage: 'ar'} : {primaryLanguage: 'en'}),
      };
    } else {
      // Android keyboard language is system controlled, we can only hint at it
      return {
        keyboardType: 'default' as KeyboardTypeOptions,
      };
    }
  };

  // Switch to appropriate keyboard when language changes
  React.useEffect(() => {
    // Reset input when language changes to ensure keyboard updates
    if (inputRef.current && value.length > 0) {
      // Force the keyboard to reload with new language by blurring/focusing
      inputRef.current.blur();
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
    }
    // Only re-run when language or value changes; inputRef is a stable ref.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLanguage, value]);

  return (
    <RTLAwareView
      style={[styles.container, containerStyle, style as ViewStyle]}>
      <View style={styles.searchIcon}>
        <Icon
          name="search"
          size={CommonSizes.icon.sm}
          color={theme.colors.textTertiary}
        />
      </View>
      <TextInput
        ref={inputRef}
        {...getKeyboardProps()}
        style={[
          styles.input,
          theme.text.body,
          styles.inputText,
          inputStyle as TextStyle,
        ]}
        placeholder={placeholder || t('search', 'common')}
        placeholderTextColor={theme.colors.textTertiary}
        selectionColor={theme.colors.accent}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
        autoFocus={autoFocus}
      />
      {value.length > 0 && (
        <TouchableOpacity onPressIn={handleClear} style={styles.clearButton}>
          <Icon
            name="circle-x"
            size={CommonSizes.icon.sm}
            color={theme.colors.textTertiary}
          />
        </TouchableOpacity>
      )}
    </RTLAwareView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: CommonSizes.control.lg,
    borderRadius: CommonSizes.borderRadius.sm,
    borderWidth: CommonSizes.borderWidth.hairline,
    paddingHorizontal: CommonSizes.spacing.medium,
  },
  input: {
    flex: 1,
    textAlign: inputTextAlign,
    paddingVertical: CommonSizes.spacing.medium,
    paddingHorizontal: CommonSizes.spacing.small,
  },
  inputText: {
    lineHeight: undefined,
  },
  searchIcon: {
    marginHorizontal: CommonSizes.spacing.small,
  },
  clearButton: {
    padding: CommonSizes.spacing.small,
  },
});
