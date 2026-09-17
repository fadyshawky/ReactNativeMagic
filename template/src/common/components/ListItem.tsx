import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {CommonSizes} from '../../core/theme/commonSizes';
import {Fonts} from '../../core/theme/fonts';
import {useTheme} from '../../core/theme/ThemeProvider';
import {Icon} from './Icon';
import {RTLAwareText} from './RTLAwareText';
import {RTLAwareView} from './RTLAwareView';

interface ListItemProps {
  title: string;
  subtitle?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  onPress?: () => void;
  showChevron?: boolean;
}

/**
 * A standard list row: an optional `left` slot, a title + optional muted
 * subtitle, then a `right` slot or a trailing chevron. Becomes tappable when
 * `onPress` is supplied.
 */
export function ListItem({
  title,
  subtitle,
  left,
  right,
  onPress,
  showChevron,
}: ListItemProps): JSX.Element {
  const {theme} = useTheme();

  const trailing =
    right != null ? (
      right
    ) : showChevron ? (
      <Icon
        name="chevron-right"
        size={CommonSizes.icon.sm}
        color={theme.colors.textDisabled}
      />
    ) : null;

  const content = (
    <RTLAwareView style={styles.row}>
      {left != null ? <View>{left}</View> : null}
      <View style={styles.textColumn}>
        <RTLAwareText style={[theme.text.body, styles.title]}>
          {title}
        </RTLAwareText>
        {subtitle != null ? (
          <RTLAwareText
            style={[theme.text.bodySm, {color: theme.colors.textTertiary}]}>
            {subtitle}
          </RTLAwareText>
        ) : null}
      </View>
      {trailing != null ? <View>{trailing}</View> : null}
    </RTLAwareView>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        style={({pressed}) =>
          pressed ? {backgroundColor: theme.colors.pressVeil} : null
        }>
        {content}
      </Pressable>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: CommonSizes.spacing.large,
    minHeight: CommonSizes.layout.rowMinHeight,
    paddingVertical: CommonSizes.spacing.large,
  },
  textColumn: {
    flex: 1,
  },
  title: {
    fontFamily: Fonts.medium,
  },
});
