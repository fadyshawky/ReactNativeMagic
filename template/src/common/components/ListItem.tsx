import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {CommonSizes} from '../../core/theme/commonSizes';
import {useTheme} from '../../core/theme/ThemeProvider';
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
      <Chevron color={theme.colors.grayScale_200} />
    ) : null;

  const content = (
    <RTLAwareView style={styles.row}>
      {left != null ? <View>{left}</View> : null}
      <View style={styles.textColumn}>
        <RTLAwareText style={theme.text.bodyLargeBold}>{title}</RTLAwareText>
        {subtitle != null ? (
          <RTLAwareText
            style={[
              theme.text.bodySmallRegular,
              {color: theme.colors.grayScale_200},
            ]}>
            {subtitle}
          </RTLAwareText>
        ) : null}
      </View>
      {trailing != null ? <View>{trailing}</View> : null}
    </RTLAwareView>
  );

  if (onPress) {
    return <Pressable onPress={onPress}>{content}</Pressable>;
  }

  return content;
}

function Chevron({color}: {color: string}): JSX.Element {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 6l6 6-6 6"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: CommonSizes.spacing.large,
    paddingVertical: CommonSizes.spacing.large,
  },
  textColumn: {
    flex: 1,
  },
});
