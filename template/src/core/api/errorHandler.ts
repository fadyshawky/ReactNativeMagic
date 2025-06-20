/**
 * Extracts meaningful error information from Axios error responses
 * and ensures the message is always a string
 * @param error The error caught from an API request
 * @returns A structured error object with message (as string) and details
 */
import {ensureString} from '../utils/stringUtils';

export const extractServerError = (error: any) => {
  let errorObj = {
    message: 'Unknown error occurred',
    status: 500,
    originalError: error,
  };

  try {
    // Extract error information from Axios response
    if (error?.response?.data) {
      const data = error.response.data;

      // Handle different error formats
      if (data.error) {
        errorObj.message = ensureString(data.error);
      } else {
        errorObj.message = ensureString(data);
      }

      errorObj.status = error.response.status;
      errorObj.originalError = data;
    } else if (error?.message) {
      errorObj.message = ensureString(error.message);
    }
  } catch (e) {}

  // Final safety check
  errorObj.message = ensureString(errorObj.message);

  return errorObj;
};
