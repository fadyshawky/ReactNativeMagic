import {useEffect, useState} from 'react';
import {getCategories} from '../../../core/store/Categories/categoryActions';
import {getProviders} from '../../../core/store/Providers/providersActions';
import {useAppDispatch, useAppSelector} from '../../../core/store/reduxHelpers';
import {RootState} from '../../../core/store/rootReducer';
export function useCategoriesData() {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();
  const {categories} = useAppSelector((state: RootState) => state.categories);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const categories = await dispatch(getCategories({data: {limit: 30}}));
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
    categories,
  };
}
