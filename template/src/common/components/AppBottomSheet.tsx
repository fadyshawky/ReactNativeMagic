import React from 'react';
import {Modal, Pressable, StyleSheet, View, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CommonSizes} from '../../core/theme/commonSizes';
import {useTheme} from '../../core/theme/ThemeProvider';
import {RTLAwareText} from './RTLAwareText';
import {useTranslation} from '../localization/LocalizationProvider';

interface AppBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

/**
 * A bottom sheet on react-native's Modal: overlay surface, 16px top radius,
 * hairline border, `lg` shadow over the scrim. Tapping the scrim closes it
 * while taps on the sheet are absorbed.
 */
export function AppBottomSheet({
  visible,
  onClose,
  title,
  children,
}: AppBottomSheetProps): JSX.Element {
  const {theme} = useTheme();
  const t = useTranslation();
  const {colors} = theme;
  const insets = useSafeAreaInsets();

  const sheetStyle: ViewStyle = {
    backgroundColor: colors.surfaceOverlay,
    borderColor: colors.borderDefault,
    boxShadow: theme.shadows.lg,
    paddingBottom: Math.max(insets.bottom, CommonSizes.spacing.xLarge),
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.container}>
        <Pressable
          style={[styles.scrim, {backgroundColor: colors.surfaceScrim}]}
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel={t('close')}
        />
        <Pressable
          style={[styles.sheet, sheetStyle]}
          onPress={event => event.stopPropagation()}
          accessibilityViewIsModal>
          <View style={styles.handleWrapper}>
            <View
              style={[styles.handle, {backgroundColor: colors.borderStrong}]}
            />
          </View>
          {title ? (
            <RTLAwareText style={theme.text.h3}>{title}</RTLAwareText>
          ) : null}
          {children}
        </Pressable>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  scrim: {
    ...StyleSheet.absoluteFill,
  },
  sheet: {
    gap: CommonSizes.layout.stack,
    paddingHorizontal: CommonSizes.layout.gutter,
    paddingTop: CommonSizes.spacing.medium,
    borderTopLeftRadius: CommonSizes.borderRadius.xl,
    borderTopRightRadius: CommonSizes.borderRadius.xl,
    borderWidth: CommonSizes.borderWidth.hairline,
    borderBottomWidth: 0,
  },
  handleWrapper: {
    alignItems: 'center',
    paddingVertical: CommonSizes.spacing.small,
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: CommonSizes.borderRadius.full,
  },
});
