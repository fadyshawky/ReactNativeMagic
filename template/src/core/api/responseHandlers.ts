import {AxiosResponse} from 'axios';
import Snackbar from 'react-native-snackbar';
import {Colors} from '../theme/colors';
import {setLogout} from '../store/user/userSlice';
import {store} from '../store/store';

export const handleFetchJsonResponse = async (
  response: AxiosResponse,
  showSuccessMessage?: boolean,
) => {
  if (response.status === 401) {
    store.dispatch(setLogout());
  } else if (
    !response.status ||
    response.status < 200 ||
    (response.status >= 300 && response.status !== 401)
  ) {
    return Snackbar.show({
      text: response?.data?.message,
      duration: Snackbar.LENGTH_SHORT,
      textColor: Colors.white,
      backgroundColor: Colors.red,
    });
  } else if (showSuccessMessage) {
    Snackbar.show({
      text: 'Success',
      duration: Snackbar.LENGTH_SHORT,
      textColor: Colors.white,
      backgroundColor: Colors.green,
    });
  }

  return response.data;
};

export const handleErrorResponse = async (message: string) => {
  return Snackbar.show({
    text: message,
    duration: Snackbar.LENGTH_SHORT,
    textColor: Colors.white,
    backgroundColor: Colors.red,
  });
};
