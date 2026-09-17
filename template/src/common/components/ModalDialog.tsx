import React from 'react';
import {Modal, Pressable, StyleSheet, View, ViewStyle} from 'react-native';
import {ButtonType} from '../../../types';
import {CommonSizes} from '../../core/theme/commonSizes';
import {useTheme} from '../../core/theme/ThemeProvider';
import {PrimaryButton} from './PrimaryButton';
import {RTLAwareText} from './RTLAwareText';
import {RTLAwareView} from './RTLAwareView';
import {useTranslation} from '../localization/LocalizationProvider';

type DialogActionVariant = 'primary' | 'ghost' | 'destructive';

interface DialogAction {
  label: string;
  onPress: () => void;
  variant?: DialogActionVariant;
}

interface ModalDialogProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  actions?: DialogAction[];
}

function buttonTypeForVariant(variant?: DialogActionVariant): ButtonType {
  switch (variant) {
    case 'destructive':
      return ButtonType.danger;
    case 'ghost':
      return ButtonType.outline;
    case 'primary':
    default:
      return ButtonType.solid;
  }
}

/**
 * Design-system Dialog on react-native's Modal. Title is a question or
 * statement ("Delete item?"), the message says what will happen, and actions
 * are verb-first ("Delete item", never "OK"/"Confirm"). Tapping the scrim
 * closes it. Falls back to a single "OK" button when no actions are supplied.
 */
export function ModalDialog({
  visible,
  onClose,
  title,
  message,
  actions,
}: ModalDialogProps): JSX.Element {
  const {theme} = useTheme();
  const t = useTranslation();
  const {colors} = theme;

  const cardStyle: ViewStyle = {
    backgroundColor: colors.surfaceOverlay,
    borderColor: colors.borderDefault,
    boxShadow: theme.shadows.dialog,
  };

  const footerStyle: ViewStyle = {
    backgroundColor: colors.bgSubtle,
    borderTopColor: colors.borderSubtle,
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.container}>
        <Pressable
          style={[styles.scrim, {backgroundColor: colors.surfaceScrim}]}
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel={t('close')}
        />
        <Pressable
          style={[styles.card, cardStyle]}
          onPress={event => event.stopPropagation()}
          accessibilityViewIsModal>
          <View style={styles.header}>
            {title ? (
              <RTLAwareText style={theme.text.h2}>{title}</RTLAwareText>
            ) : null}
            {message ? (
              <RTLAwareText
                style={[theme.text.body, {color: colors.textSecondary}]}>
                {message}
              </RTLAwareText>
            ) : null}
          </View>
          <RTLAwareView style={[styles.footer, footerStyle]}>
            {actions && actions.length > 0 ? (
              actions.map((action, index) => (
                <PrimaryButton
                  key={`${action.label}-${index}`}
                  label={action.label}
                  size="md"
                  fullWidth={false}
                  type={buttonTypeForVariant(action.variant)}
                  onPress={action.onPress}
                />
              ))
            ) : (
              <PrimaryButton
                label="OK"
                size="md"
                fullWidth={false}
                type={ButtonType.solid}
                onPress={onClose}
              />
            )}
          </RTLAwareView>
        </Pressable>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: CommonSizes.spacing.xxLarge,
  },
  scrim: {
    ...StyleSheet.absoluteFill,
  },
  card: {
    width: '100%',
    maxWidth: 480,
    borderRadius: CommonSizes.borderRadius.xl,
    borderWidth: CommonSizes.borderWidth.hairline,
    overflow: 'hidden',
  },
  header: {
    gap: 6,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
    gap: CommonSizes.spacing.medium,
    padding: 20,
    marginTop: 20,
    borderTopWidth: CommonSizes.borderWidth.hairline,
  },
});
