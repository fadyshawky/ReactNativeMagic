import {Animated, View, TouchableOpacity} from 'react-native';
import {CommonStyles, screenWidth} from '../core/theme/commonStyles';
import {NaturalColors} from '../core/theme/colors';

export function TopBar({state, descriptors, navigation, position}: any) {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: NaturalColors.grayScale_50,
        width: screenWidth - 60,
        alignSelf: 'center',
        height: 40,
        borderRadius: 20,
        marginBottom: 24,
      }}>
      {state.routes.map((route: any, index: any) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: isFocused
                ? NaturalColors.grayScale_0
                : NaturalColors.grayScale_50,
              borderRadius: 20,
            }}>
            <Animated.Text
              style={
                isFocused
                  ? {...CommonStyles.h4_bold, fontWeight: 'bold'}
                  : CommonStyles.h4_regular
              }>
              {label}
            </Animated.Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
