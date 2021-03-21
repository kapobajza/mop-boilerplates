export type ActionHandler = (...args: any[]) => Promise<(() => void) | undefined | void>;

export interface ReducerAction<T> {
  type: 'FETCH_START' | 'FETCH_SUCCESS' | 'FETCH_ERROR' | 'CLEAR' | 'REMOVE';
  payload?: {
    data?: T[];
    item?: T;
  };
}

export interface ReducerState<T> {
  data: T[];
  loading: boolean;
  initialLoading: boolean;
  shouldFetch: boolean;
  canLoadMore: boolean;
  page: number;
  limit: number;
}
