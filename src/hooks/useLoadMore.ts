import { useCallback, useEffect, useReducer } from 'react';
import { useFlashMessage } from '../components/FlashMessage';

import { ReducerAction, ReducerState } from './types';

const initialState: ReducerState<any> = {
  data: [],
  loading: false,
  initialLoading: true,
  shouldFetch: true,
  canLoadMore: true,
  page: 1,
  limit: 10,
};

const reducer = <T extends { id?: string }>(
  state: ReducerState<T>,
  { type, payload }: ReducerAction<T>,
): ReducerState<T> => {
  switch (type) {
    case 'FETCH_START':
      return {
        ...state,
        loading: state.page === 1 || !state.canLoadMore ? false : true,
        shouldFetch: state.canLoadMore ? true : false,
      };

    case 'FETCH_SUCCESS':
      return {
        ...state,
        data: [...state.data, ...(payload?.data ?? [])],
        initialLoading: false,
        loading: false,
        canLoadMore: (payload?.data && payload?.data.length >= state.limit) ?? false,
        page: state.page + 1,
        shouldFetch: false,
      };

    case 'FETCH_ERROR':
      return {
        ...state,
        loading: false,
        initialLoading: false,
      };

    case 'CLEAR': {
      return initialState;
    }

    default:
      return state;
  }
};

export default function <T extends { id?: string }>(
  action: (limit: number, page: number) => Promise<T[]>,
  limit = 10,
) {
  const [{ shouldFetch, page, loading, initialLoading, data }, dispatch] = useReducer(reducer, {
    ...initialState,
    limit,
  });
  const { showError } = useFlashMessage();

  const onLoadMore = useCallback(() => {
    dispatch({ type: 'FETCH_START' });
  }, []);

  const clear = useCallback(() => {
    dispatch({ type: 'CLEAR' });
  }, []);

  useEffect(() => {
    (async () => {
      if (!shouldFetch) {
        return;
      }

      try {
        const data = await action(limit, page);
        dispatch({ type: 'FETCH_SUCCESS', payload: { data } });
      } catch (err) {
        showError(err);
        dispatch({ type: 'FETCH_ERROR' });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, shouldFetch]);

  return { onLoadMore, data: data as T[], loading, initialLoading, clear, dispatch };
}
