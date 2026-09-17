import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {LightColors} from '../../core/theme/colors';
import {CommonSizes} from '../../core/theme/commonSizes';
import {lightTheme} from '../../core/theme/themes';

// Mounted above ThemeProvider, so it uses the static light theme.
interface Props {
  children: React.ReactNode;
  fallback?: (reset: () => void, error: Error) => React.ReactNode;
  onError?: (error: Error, info: React.ErrorInfo) => void;
}

interface State {
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = {error: null};

  static getDerivedStateFromError(error: Error): State {
    return {error};
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    if (__DEV__) {
      console.error('[ErrorBoundary]', error, info.componentStack);
    }
    this.props.onError?.(error, info);
  }

  reset = () => this.setState({error: null});

  render() {
    if (!this.state.error) return this.props.children;
    if (this.props.fallback) {
      return this.props.fallback(this.reset, this.state.error);
    }
    return (
      <View style={styles.root}>
        <Text style={styles.title}>Something went wrong</Text>
        <Text style={styles.message} numberOfLines={6}>
          {this.state.error.message}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={this.reset}
          accessibilityRole="button">
          <Text style={styles.buttonText}>Try again</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: CommonSizes.spacing.xxLarge,
    backgroundColor: LightColors.bgCanvas,
  },
  title: {
    ...lightTheme.text.h2,
    marginBottom: CommonSizes.spacing.large,
  },
  message: {
    ...lightTheme.text.mono,
    color: LightColors.textSecondary,
    textAlign: 'center',
    marginBottom: CommonSizes.spacing.xxLarge,
  },
  button: {
    height: CommonSizes.control.lg,
    justifyContent: 'center',
    backgroundColor: LightColors.accent,
    paddingHorizontal: 20,
    borderRadius: CommonSizes.borderRadius.sm,
  },
  buttonText: {
    ...lightTheme.text.label,
    fontSize: 15,
    color: LightColors.textOnAccent,
  },
});
