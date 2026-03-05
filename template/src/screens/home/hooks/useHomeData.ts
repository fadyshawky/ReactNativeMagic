import {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../core/store/reduxHelpers';
import {RootState} from '../../../core/store/rootReducer';
export function useHomeData() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const {categories, loadState} = useAppSelector(
    (state: RootState) => state.categories,
  );
  const {user} = useAppSelector((state: RootState) => state.user);

  

  return {
    isLoading,
    user,
  };
}
