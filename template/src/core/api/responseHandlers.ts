import {AxiosResponse} from 'axios';
import Snackbar from 'react-native-snackbar';
import {setLogout} from '../store/user/userSlice';
import {store} from '../store/store';

export const handleFetchJsonResponse = (
  response: AxiosResponse,
  showSuccessMessage?: boolean,
) => {
  return response.data;
};

export const handleErrorResponse = async (message: string) => {
  return Snackbar.show({
    text: message,
    duration: Snackbar.LENGTH_SHORT,
  });
};
