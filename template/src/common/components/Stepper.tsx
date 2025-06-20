import React from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import {useTheme} from '../../core/theme/ThemeProvider';
import {Theme} from '../../core/theme/types';
import {PrimaryColors} from '../../core/theme/colors';
import {ImageResources} from '../ImageResources.g';

interface Step {
  title: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  orientation?: 'horizontal' | 'vertical';
  onStepPress?: (index: number) => void;
}

const STEP_SIZE = 64;

const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  orientation = 'horizontal',
  onStepPress,
}) => {
  const {theme} = useTheme();
  const isDarkMode = theme.mode === 'dark';
  const styles = createStyles(theme, orientation, isDarkMode);

  return (
    <View style={styles.container}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;
        const isLastStep = index === steps.length - 1;

        const connectorStyle = [
          styles.connector,
          (isCompleted || isActive) && styles.connectorCompleted,
        ];

        return (
          <React.Fragment key={index}>
            <Pressable
              style={styles.stepContainer}
              onPress={() => onStepPress?.(index)}>
              <View
                style={[
                  styles.circle,
                  isCompleted && styles.circleCompleted,
                  isActive && styles.circleActive,
                ]}>
                {isCompleted ? (
                  <Image source={ImageResources.complete} style={styles.icon} />
                ) : (
                  <Text style={styles.stepNumber}>{index + 1}</Text>
                )}
              </View>
              <Text
                style={[
                  styles.title,
                  (isCompleted || isActive) && styles.titleActive,
                ]}>
                {step.title}
              </Text>
            </Pressable>
            {!isLastStep && <View style={connectorStyle} />}
          </React.Fragment>
        );
      })}
    </View>
  );
};

const createStyles = (
  theme: Theme,
  orientation: 'horizontal' | 'vertical',
  isDarkMode: boolean,
) =>
  StyleSheet.create({
    container: {
      flexDirection: orientation === 'horizontal' ? 'row' : 'column',
      alignItems: orientation === 'horizontal' ? 'flex-start' : 'stretch',
    },
    stepContainer: {
      alignItems: 'center',
      flex: orientation === 'horizontal' ? 1 : undefined,
    },
    circle: {
      width: STEP_SIZE,
      height: STEP_SIZE,
      borderRadius: STEP_SIZE / 2,
      borderWidth: 1,
      borderColor: isDarkMode
        ? theme.colors.grayScale_400
        : theme.colors.grayScale_50,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
    },
    circleCompleted: {
      backgroundColor: PrimaryColors.PlatinateBlue_400,
      borderColor: PrimaryColors.PlatinateBlue_400,
    },
    circleActive: {
      borderColor: PrimaryColors.PlatinateBlue_400,
    },
    icon: {
      width: STEP_SIZE / 2,
      height: STEP_SIZE / 2,
      tintColor: theme.colors.grayScale_0,
    },
    stepNumber: {
      ...theme.text.bodyXLargeRegular,
      color: isDarkMode
        ? theme.colors.grayScale_400
        : theme.colors.grayScale_50,
    },
    title: {
      ...theme.text.bodyMediumRegular,
      marginTop: theme.spacing.small,
      color: isDarkMode
        ? theme.colors.grayScale_400
        : theme.colors.grayScale_50,
    },
    titleActive: {
      color: theme.colors.cetaceanBlue_700,
    },
    connector: {
      backgroundColor: isDarkMode
        ? theme.colors.grayScale_400
        : theme.colors.grayScale_50,
      ...(orientation === 'horizontal'
        ? {
            height: 1,
            flex: 1,
            marginHorizontal: -STEP_SIZE / 4,
            top: STEP_SIZE / 2,
          }
        : {
            width: 1,
            flex: 1,
            marginVertical: -STEP_SIZE / 4,
            left: '50%',
          }),
    },
    connectorCompleted: {
      backgroundColor: PrimaryColors.PlatinateBlue_400,
    },
  });

export default Stepper;
