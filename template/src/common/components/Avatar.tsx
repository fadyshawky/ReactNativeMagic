import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {CommonSizes} from '../../core/theme/commonSizes';
import {Fonts} from '../../core/theme/fonts';
import {useTheme} from '../../core/theme/ThemeProvider';
import {RTLAwareText} from './RTLAwareText';

interface AvatarProps {
  name?: string;
  uri?: string;
  size?: number;
}

const DEFAULT_SIZE = 44;

function getInitials(name?: string): string {
  if (!name) {
    return '?';
  }
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) {
    return '?';
  }
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

/**
 * A circular avatar. With `uri` it renders the image; otherwise the name's
 * initials (1–2 letters, '?' when absent) in Geist Mono on an accent-subtle
 * circle. Initials scale with `size`.
 */
export function Avatar({
  name,
  uri,
  size = DEFAULT_SIZE,
}: AvatarProps): JSX.Element {
  const {theme} = useTheme();
  const circleStyle = {
    width: size,
    height: size,
    borderRadius: CommonSizes.borderRadius.full,
  };

  if (uri) {
    return (
      <Image
        source={{uri}}
        style={[
          circleStyle,
          styles.image,
          {borderColor: theme.colors.borderSubtle},
        ]}
      />
    );
  }

  return (
    <View
      style={[
        circleStyle,
        styles.initialsWrap,
        {backgroundColor: theme.colors.accentSubtle},
      ]}>
      <RTLAwareText
        style={[
          styles.initials,
          {
            color: theme.colors.textAccent,
            fontSize: Math.round(size * 0.32),
            lineHeight: Math.round(size * 0.4),
          },
        ]}>
        {getInitials(name)}
      </RTLAwareText>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    resizeMode: 'cover',
    borderWidth: CommonSizes.borderWidth.hairline,
  },
  initialsWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    fontFamily: Fonts.monoMedium,
    textAlign: 'center',
  },
});
