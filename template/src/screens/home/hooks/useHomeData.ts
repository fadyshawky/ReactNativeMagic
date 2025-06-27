import {useState} from 'react';
import {getCategories} from '../../../core/store/Categories/categoryActions';
import {clearSelectedCategory} from '../../../core/store/Categories/categorySlice';
import {getHomeProviders} from '../../../core/store/Providers/providersActions';
import {useAppDispatch, useAppSelector} from '../../../core/store/reduxHelpers';
import {RootState} from '../../../core/store/rootReducer';
import {getBalance} from '../../../core/store/user/userActions';
import {clearSelectedProvider} from '../../../core/store/Providers/providersSlice';
export function useHomeData() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const {categories, loadState} = useAppSelector(
    (state: RootState) => state.categories,
  );
  const [isPayByCodeModalVisible, setIsPayByCodeModalVisible] = useState(false);
  const {homeProviders} = useAppSelector((state: RootState) => state.providers);
  const {user} = useAppSelector((state: RootState) => state.user);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const balance = await dispatch(getBalance());
      if (balance.type.includes('fulfilled')) {
        const categoryResponse = await dispatch(
          getCategories({data: {limit: 30}}),
        );
        if (categoryResponse.type.includes('fulfilled')) {
          const category_id = categoryResponse?.payload?.categories?.[0]?.id;
          await dispatch(getHomeProviders({data: {category_id: category_id}}));
        }
      }
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
    user,
    homeProviders,
    loadState,
    isPayByCodeModalVisible,
    setIsPayByCodeModalVisible,
  };
}
