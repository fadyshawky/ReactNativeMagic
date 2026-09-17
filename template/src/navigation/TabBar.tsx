import {
  BottomTabBarProps,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import {toString} from 'lodash';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Icon, IconName} from '../common/components/Icon';
import {RTLAwareText} from '../common/components/RTLAwareText';
import {RTLAwareView} from '../common/components/RTLAwareView';
import {useTranslation} from '../common/localization/LocalizationProvider';
import {CommonSizes} from '../core/theme/commonSizes';
import {Fonts} from '../core/theme/fonts';
import {useTheme} from '../core/theme/ThemeProvider';

interface TabBarOptions extends BottomTabNavigationOptions {
  icon: IconName;
  tabBarTestID?: string;
}

export function TabBar({state, descriptors, navigation}: BottomTabBarProps) {
  const {theme} = useTheme();
  const t = useTranslation();
  const insets = useSafeAreaInsets();
  const tabArray = ['Main', 'Components', 'Account'];

  // Create a copy of routes array to avoid modifying the original
  // Native RTL mirrors the row, so tabs keep their declared order.
  const routesToRender = state.routes.filter(r => tabArray.includes(r.name));

  return (
    state.index <= 3 && (
      <RTLAwareView
        style={[
          styles.container,
          {
            paddingBottom: insets.bottom,
            backgroundColor: theme.colors.bgCanvas,
            borderTopColor: theme.colors.borderSubtle,
          },
        ]}>
        {routesToRender.map(route => {
          const isFocused = state.routes[state.index]?.key === route.key;

          const {options} = descriptors[route.key] as unknown as {
            options: TabBarOptions;
          };

          // Get localized tab name
          let label = route.name;
          if (options.tabBarLabel !== undefined) {
            label = options.tabBarLabel as string;
          } else if (options.title !== undefined) {
            label = options.title;
          } else {
            // Try to get localized name from mainNavigation translations
            const localizedName = t(`tabs.${route.name}`, 'mainNavigation');
            if (localizedName !== `tabs.${route.name}`) {
              label = localizedName;
            }
          }

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

          const tint = isFocused
            ? theme.colors.textAccent
            : theme.colors.textTertiary;

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
              accessibilityLabel={
                options.tabBarAccessibilityLabel || label?.toString()
              }
              testID={options.tabBarTestID}
              onPressIn={onPress}
              onLongPress={onLongPress}
              style={styles.tabButton}>
              <Icon name={options.icon} size={21} color={tint} />
              <RTLAwareText style={[styles.label, {color: tint}]}>
                {toString(label)}
              </RTLAwareText>
            </TouchableOpacity>
          );
        })}
      </RTLAwareView>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'stretch',
    borderTopWidth: CommonSizes.borderWidth.hairline,
  },
  tabButton: {
    flex: 1,
    height: CommonSizes.tabBarHeight,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  label: {
    fontFamily: Fonts.medium,
    fontSize: 10,
    lineHeight: 12,
  },
});
