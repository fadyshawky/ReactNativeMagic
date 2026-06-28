import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {NaturalColors, PrimaryColors} from '../../core/theme/colors';
import {Fonts} from '../../core/theme/fonts';
import {CommonSizes} from '../../core/theme/commonSizes';

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
        <TouchableOpacity style={styles.button} onPress={this.reset}>
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
    padding: 24,
    backgroundColor: NaturalColors.background_2,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: CommonSizes.font.bodyXLarge,
    marginBottom: 12,
  },
  message: {
    fontFamily: Fonts.regular,
    fontSize: CommonSizes.font.bodyMedium,
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    backgroundColor: PrimaryColors.PlatinateBlue_400,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontFamily: Fonts.bold,
    fontSize: CommonSizes.font.bodyMedium,
  },
});
