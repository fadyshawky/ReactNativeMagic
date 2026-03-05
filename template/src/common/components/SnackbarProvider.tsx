import React from 'react';

/**
 * Wrapper for snackbar/toast. The template uses react-native-snackbar directly.
 * Replace with a custom implementation (e.g. context + showSnackbar) if needed.
 */
export const SnackbarProvider = ({
  children = null,
}: {
  children?: React.ReactNode;
}): React.JSX.Element => <>{children}</>;
