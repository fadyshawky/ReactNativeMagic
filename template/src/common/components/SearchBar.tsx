import React from 'react';
import {
  I18nManager,
  KeyboardTypeOptions,
  Platform,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {CommonSizes} from '../../core/theme/commonSizes';
import {createThemedStyles} from '../../core/theme/commonStyles';
import {useTheme} from '../../core/theme/ThemeProvider';
import {Languages} from '../localization/localization';
import {
  useLocalization,
  useRTL,
  useTranslation,
} from '../localization/LocalizationProvider';
import {RTLAwareView} from './RTLAwareView';

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
  const isRTL = useRTL();
  const {currentLanguage} = useLocalization();
  const isArabic = currentLanguage === Languages.ar;

  // Create a ref to the TextInput to control it programmatically if needed
  const inputRef = React.useRef<TextInput>(null);

  const handleClear = () => {
    onChangeText('');
    if (onClear) {
      onClear();
    }
  };

  const containerStyle: ViewStyle = {
    backgroundColor: `${theme.colors.grayScale_0}20`,
    borderColor: theme.colors.grayScale_25,
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
    if (Platform.OS === 'android') {
      // On Android, the keyboard language is managed system-wide
      // We can only ensure our TextInput respects RTL settings
      const shouldBeRTL = isArabic;
      if (I18nManager.isRTL !== shouldBeRTL) {
      }
    }

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
  }, [currentLanguage, value]);

  return (
    <RTLAwareView
      style={[
        styles.container,
        containerStyle,
        style as ViewStyle,
        {
          backgroundColor: theme.colors.grayScale_0,
          ...createThemedStyles(theme).dropShadow,
        },
      ]}>
      <Icon
        name="search"
        size={20}
        color={theme.colors.grayScale_50}
        style={styles.searchIcon}
      />
      <TextInput
        ref={inputRef}
        {...getKeyboardProps()}
        style={[
          styles.input,
          theme.text.SearchBar,
          {
            textAlign: isRTL ? 'right' : 'left',
          },
          inputStyle as TextStyle,
        ]}
        placeholder={placeholder || t('search', 'common')}
        placeholderTextColor={`${theme.colors.grayScale_50}80`}
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
            name="close-circle"
            size={20}
            color={theme.colors.grayScale_50}
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
    height: 48,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: CommonSizes.spacing.medium,
    marginHorizontal: CommonSizes.spacing.large,
    marginBottom: CommonSizes.spacing.large,
  },
  input: {
    flex: 1,
    paddingVertical: CommonSizes.spacing.medium,
    paddingHorizontal: CommonSizes.spacing.small,
  },
  searchIcon: {
    marginHorizontal: CommonSizes.spacing.small,
  },
  clearButton: {
    padding: CommonSizes.spacing.small,
  },
});
