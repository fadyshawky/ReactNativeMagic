import {TouchableOpacity, View} from 'react-native';

/**
 * RTL layout is native. RTLInitializer keeps `I18nManager` in step with the
 * language, so React Native already lays `row` out right to left and swaps
 * start/end, left/right and `textAlign`. Flipping styles here as well mirrors
 * everything twice (back to LTR), so these are plain `View` /
 * `TouchableOpacity`. Write layouts for LTR with `start`/`end`; plain `View`
 * behaves the same in new code.
 */
export const RTLAwareView = View;
export const RTLAwareTouchableOpacity = TouchableOpacity;
