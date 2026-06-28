import React from 'react';
import {Modal, Pressable, StyleSheet, View, ViewStyle} from 'react-native';
import {ButtonType} from '../../../types';
import {useTheme} from '../../core/theme/ThemeProvider';
import {CommonSizes} from '../../core/theme/commonSizes';
import {PrimaryButton} from './PrimaryButton';
import {RTLAwareText} from './RTLAwareText';

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
      return ButtonType.outlineNegative;
    case 'ghost':
      return ButtonType.borderless;
    case 'primary':
    default:
      return ButtonType.solid;
  }
}

/**
 * A centered alert/confirm dialog built on react-native's Modal.
 * Fades in over a dimmed midnight backdrop; tapping the backdrop closes it.
 * Falls back to a single "OK" button when no actions are supplied.
 */
export function ModalDialog({
  visible,
  onClose,
  title,
  message,
  actions,
}: ModalDialogProps): JSX.Element {
  const {theme} = useTheme();

  const cardStyle: ViewStyle = {
    backgroundColor: theme.colors.grayScale_0,
    borderRadius: CommonSizes.borderRadius.large,
    padding: CommonSizes.spacing.xLarge,
    maxWidth: 340,
    width: '100%',
    alignSelf: 'center',
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.container}>
        <Pressable
          style={styles.backdrop}
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel="Close"
        />
        <Pressable style={cardStyle} onPress={event => event.stopPropagation()}>
          {title ? (
            <RTLAwareText style={[theme.text.header4, styles.title]}>
              {title}
            </RTLAwareText>
          ) : null}
          {message ? (
            <RTLAwareText
              style={[
                theme.text.bodyMediumRegular,
                styles.message,
                {color: theme.colors.grayScale_200},
              ]}>
              {message}
            </RTLAwareText>
          ) : null}
          <View style={styles.actions}>
            {actions && actions.length > 0 ? (
              actions.map((action, index) => (
                <View
                  key={`${action.label}-${index}`}
                  style={
                    index > 0 ? styles.actionSpacing : undefined
                  }>
                  <PrimaryButton
                    label={action.label}
                    type={buttonTypeForVariant(action.variant)}
                    onPress={action.onPress}
                  />
                </View>
              ))
            ) : (
              <PrimaryButton
                label="OK"
                type={ButtonType.solid}
                onPress={onClose}
              />
            )}
          </View>
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
    paddingHorizontal: CommonSizes.spacing.xLarge,
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(6,8,15,0.6)',
  },
  title: {
    marginBottom: CommonSizes.spacing.medium,
  },
  message: {
    marginBottom: CommonSizes.spacing.large,
  },
  actions: {
    marginTop: CommonSizes.spacing.medium,
  },
  actionSpacing: {
    marginTop: CommonSizes.spacing.medium,
  },
});
