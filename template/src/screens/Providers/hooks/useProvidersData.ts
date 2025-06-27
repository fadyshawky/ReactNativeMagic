import {useState} from 'react';
import {getProviders} from '../../../core/store/Providers/providersActions';
import {useAppDispatch, useAppSelector} from '../../../core/store/reduxHelpers';
import {RootState} from '../../../core/store/rootReducer';
export function useProvidersData(categoryID: string) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const {providers} = useAppSelector((state: RootState) => state.providers);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      await dispatch(
        getProviders({data: {limit: 5000, category_id: Number(categoryID)}}),
      );
    } catch (error) {
      console.error('Error fetching home data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshData = () => {
    fetchData();
  };

  return {
    isLoading,
    refreshData,
    fetchData,
    providers,
  };
}
