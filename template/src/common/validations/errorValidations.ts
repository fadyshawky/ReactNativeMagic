import {localization} from '../localization/localization';
import {unwrapResult} from '@reduxjs/toolkit';
import {Alert} from 'react-native';
import {IErrorResult, ErrorRepresentationType} from '../../../types';
import Snackbar from 'react-native-snackbar';
import {NewColors} from '../../core/theme/colors';
export function handlePromiseResult(
  promiseAction: Promise<any>,
  successMessage?: string,
  successAction?: () => void,
  processError?: (error: Error) => IErrorResult,
  setError?: (errorMessage: string) => void,
) {
  promiseAction
    .then(unwrapResult)
    .then(() => {
      successMessage &&
        Snackbar.show({
          text: successMessage,
          duration: Snackbar.LENGTH_SHORT,
        });
      successAction && successAction();
    })
    .catch((handledError: Error) => {
      processError &&
        handleErrorPostProcessing(processError(handledError), setError);
    });
}

export function handleErrorPostProcessing(
  error: IErrorResult,
  setError?: (errorMessage: string) => void,
) {
  switch (error.visualRepresentation) {
    case ErrorRepresentationType.alert:
      Alert.alert(localization.errors.error, error.message);
      break;
    case ErrorRepresentationType.input:
      setError && setError(error.message);
      break;
    case ErrorRepresentationType.toast:
      Snackbar.show({
        text: error.message,
        duration: Snackbar.LENGTH_SHORT,
      });
      break;
    default:
      throw new Error(
        `Unknown error representation type: ${error.visualRepresentation}`,
      );
  }
}

export function recheckAllValidations(
  recheckFunctions: (() => string | null)[],
): boolean {
  let isNull: boolean = true;

  recheckFunctions.forEach(recheckFunc => {
    const result = recheckFunc() == null;
    if (!result) {
      isNull = false;
    }
  });

  return isNull;
}
