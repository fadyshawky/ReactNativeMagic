import React from 'react';
import {Modal, Pressable, StyleSheet, View, ViewStyle} from 'react-native';
import {useTheme} from '../../core/theme/ThemeProvider';
import {CommonSizes} from '../../core/theme/commonSizes';
import {RTLAwareText} from './RTLAwareText';

interface AppBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

/**
 * A bottom-anchored sheet built on react-native's Modal.
 * Slides up from the bottom with a dimmed midnight backdrop; tapping the
 * backdrop closes it while taps on the card are absorbed.
 */
export function AppBottomSheet({
  visible,
  onClose,
  title,
  children,
}: AppBottomSheetProps): JSX.Element {
  const {theme} = useTheme();

  const cardStyle: ViewStyle = {
    backgroundColor: theme.colors.grayScale_0,
    borderTopLeftRadius: CommonSizes.borderRadius.xLarge,
    borderTopRightRadius: CommonSizes.borderRadius.xLarge,
    padding: CommonSizes.spacing.large,
    paddingBottom: CommonSizes.spacing.xxxLarge,
  };

  const handleStyle: ViewStyle = {
    width: 40,
    height: 4,
    borderRadius: CommonSizes.borderRadius.full,
    backgroundColor: theme.colors.grayScale_50,
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.container}>
        <Pressable
          style={styles.backdrop}
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel="Close"
        />
        <Pressable style={cardStyle} onPress={event => event.stopPropagation()}>
          <View style={styles.handleWrapper}>
            <View style={handleStyle} />
          </View>
          {title ? (
            <RTLAwareText style={[theme.text.bodyXLargeBold, styles.title]}>
              {title}
            </RTLAwareText>
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
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(6,8,15,0.6)',
  },
  handleWrapper: {
    alignItems: 'center',
    marginBottom: CommonSizes.spacing.large,
  },
  title: {
    marginBottom: CommonSizes.spacing.medium,
  },
});
