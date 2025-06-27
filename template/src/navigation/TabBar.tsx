import {
  BottomTabBarProps,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import {toString} from 'lodash';
import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {RTLAwareText} from '../common/components/RTLAwareText';
import {RTLAwareView} from '../common/components/RTLAwareView';
import {
  useRTL,
  useTranslation,
} from '../common/localization/LocalizationProvider';
import {BlackColors, NewColors} from '../core/theme/colors';
import {CommonSizes} from '../core/theme/commonSizes';
import {CommonStyles} from '../core/theme/commonStyles';
import {scaleHeight, scaleWidth} from '../core/theme/scaling';
import {useTheme} from '../core/theme/ThemeProvider';

interface TabBarOptions extends BottomTabNavigationOptions {
  selectedIcon: ImageSourcePropType;
  icon: ImageSourcePropType;
  tabBarTestID?: string;
}

export function TabBar({state, descriptors, navigation}: BottomTabBarProps) {
  const {theme} = useTheme();
  const t = useTranslation();
  const isRTL = useRTL();
  const tabArray = ['Main', 'Financials', 'Account'];

  // Create a copy of routes array to avoid modifying the original
  const routesToRender = [...state.routes].filter(r =>
    tabArray.includes(r.name),
  );

  // If RTL, reverse the order of tabs
  if (isRTL) {
    routesToRender.reverse();
  }

  return (
    state.index <= 3 && (
      <RTLAwareView style={styles.container}>
        {routesToRender.map((route, index) => {
          // Calculate the correct index in the original array for focused state
          const originalIndex = isRTL ? state.routes.length - 1 - index : index;
          const isFocused = state.index === originalIndex;

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
              <Image
                style={{
                  width: scaleWidth(57),
                  height: scaleHeight(63),
                  resizeMode: 'contain',
                }}
                source={isFocused ? options.selectedIcon : options.icon}
              />
              <RTLAwareText style={[theme.text.navBar]}>
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
    alignItems: 'center',
    height: scaleHeight(130),
    borderTopLeftRadius: CommonSizes.borderRadius.huge,
    borderTopRightRadius: CommonSizes.borderRadius.huge,
    justifyContent: 'space-evenly',
    ...CommonStyles.dropShadow,
    backgroundColor: BlackColors.indigoBlue,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
  },
  label: {},
  labelFocused: {
    color: NewColors.blueNormalActive,
  },
});
