import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {CommonStyles} from '../core/theme/commonStyles';
import {
  BottomTabBarProps,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import {ImageSourcePropType} from 'react-native';
import {toString} from 'lodash';
import {NaturalColors, PrimaryColors} from '../core/theme/colors';

interface TabBarOptions extends BottomTabNavigationOptions {
  selectedIcon: ImageSourcePropType;
  icon: ImageSourcePropType;
  tabBarTestID?: string;
}

export function TabBar({state, descriptors, navigation}: BottomTabBarProps) {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key] as unknown as {
          options: TabBarOptions;
        };
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
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabButton}>
            <Image source={isFocused ? options.selectedIcon : options.icon} />
            <Text style={[styles.label, isFocused && styles.labelFocused]}>
              {toString(label)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 100,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    justifyContent: 'space-evenly',
    ...CommonStyles.shadow,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
  },
  label: {
    color: NaturalColors.grayScale_50,
  },
  labelFocused: {
    color: PrimaryColors.PlatinateBlue_700,
  },
});
