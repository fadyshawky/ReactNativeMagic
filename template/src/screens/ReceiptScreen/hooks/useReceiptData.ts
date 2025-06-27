import {useState} from 'react';
import {useAppSelector, useAppDispatch} from '../../../core/store/reduxHelpers';
import {RootState} from '../../../core/store/rootReducer';
import {fetchHistoryDetails} from '../../../core/store/user/userActions';

type ReceiptType = 'print' | 'history';

export function useReceiptData(type: ReceiptType, historyID?: string) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  // Get data from services store for print type
  const {paymentResponse, service} = useAppSelector(
    (state: RootState) => state.services,
  );

  // State for history data
  const [historyDetails, setHistoryDetails] = useState<any[]>([]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      if (type === 'print') {
        // For print type, data is already in the store
        return;
      } else if (type === 'history' && historyID) {
        // For history type, fetch data from API
        const result = await dispatch(fetchHistoryDetails({trxRef: historyID}));
        if (fetchHistoryDetails.fulfilled.match(result)) {
          setHistoryDetails(result.payload.data);
        }
      }
    } catch (error) {
      console.error('Error fetching receipt data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    fetchData,
    isLoading,
    receiptData: type === 'print' ? paymentResponse : historyDetails,
    service: type === 'print' ? service : undefined,
  };
}
