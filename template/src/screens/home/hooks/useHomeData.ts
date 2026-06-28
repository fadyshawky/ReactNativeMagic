import {useCallback, useEffect} from 'react';
import {fetchCategories} from '../../../core/store/categories/categoriesActions';
import {useAppDispatch, useAppSelector} from '../../../core/store/reduxHelpers';
import {RootState} from '../../../core/store/rootReducer';

/**
 * Loads the example `categories` feature and exposes the user.
 * Fetches on mount; `reload` is wired to the list's pull-to-refresh / try-again.
 */
export function useHomeData() {
  const dispatch = useAppDispatch();
  const {categories, loadState, error} = useAppSelector(
    (state: RootState) => state.categories,
  );
  const {user} = useAppSelector((state: RootState) => state.user);

  const loadCategories = useCallback(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  return {
    user,
    categories,
    loadState,
    error,
    reload: loadCategories,
  };
}
