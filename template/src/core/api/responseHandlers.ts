import {AxiosResponse} from 'axios';
import {Snackbar} from 'react-native-snackbar';

export const handleFetchJsonResponse = (
  response: AxiosResponse,
  _showSuccessMessage?: boolean,
) => {
  return response.data;
};

export const handleErrorResponse = async (message: string) => {
  return Snackbar.show({
    text: message,
    duration: Snackbar.LENGTH_SHORT,
  });
};
