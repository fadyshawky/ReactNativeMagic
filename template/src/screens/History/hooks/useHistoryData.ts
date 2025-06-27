import {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../core/store/reduxHelpers';
import {RootState} from '../../../core/store/rootReducer';
import {fetchHistory} from '../../../core/store/user/userActions';
import {clearHistory} from '../../../core/store/user/userSlice';
export function useHistoryData() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const {history} = useAppSelector((state: RootState) => state.user);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async (selectedPage: number) => {
    setIsLoading(true);
    try {
      const res = await dispatch(
        fetchHistory({data: {page: selectedPage, limit: 10}}),
      );
      if (res.type.includes('fulfilled')) {
        setHasMore(res.payload.pagination.hasNextPage);
      }
    } catch (error) {
      console.error('Error fetching history data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchInitialData = async () => {
    dispatch(clearHistory());
    setPage(1);
    fetchData(1);
  };

  const refreshData = () => {
    fetchInitialData();
  };

  return {
    isLoading,
    refreshData,
    history,
    setPage,
    page,
    fetchData,
    fetchInitialData,
    hasMore,
  };
}
