import React from 'react';
import {Image, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {BrandGradients, GradientDirection} from '../../core/theme/brand';
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
 * A circular avatar. With `uri` it renders the image; otherwise it shows the
 * name's initials (1–2 letters, '?' when absent) in white on a gradient circle.
 * Initials scale with `size`.
 */
export function Avatar({name, uri, size = DEFAULT_SIZE}: AvatarProps): JSX.Element {
  const circleStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
  };

  if (uri) {
    return <Image source={{uri}} style={[circleStyle, styles.image]} />;
  }

  return (
    <LinearGradient
      colors={BrandGradients.primary}
      start={GradientDirection.start}
      end={GradientDirection.end}
      style={[circleStyle, styles.gradient]}>
      <RTLAwareText
        style={[
          styles.initials,
          {fontSize: size * 0.4, lineHeight: size * 0.5},
        ]}>
        {getInitials(name)}
      </RTLAwareText>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  image: {
    resizeMode: 'cover',
  },
  gradient: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
