import {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../core/store/reduxHelpers';
import {RootState} from '../../../core/store/rootReducer';
import {getServices} from '../../../core/store/Services/servicesActions';
export function useServicesData(providerID: string) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const {services} = useAppSelector((state: RootState) => state.services);
  const {selectedProvider} = useAppSelector(
    (state: RootState) => state.providers,
  );
  const {selectedCategory} = useAppSelector(
    (state: RootState) => state.categories,
  );

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data =
        selectedProvider?.provider === 'Fawry'
          ? {fawry_provider_id: providerID, category_id: selectedCategory?.id}
          : {bee_provider_id: providerID, category_id: selectedCategory?.id};
      const response = await dispatch(getServices({data}));
    } catch (error) {
      console.error('Error fetching services data:', error);
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
    services,
  };
}
