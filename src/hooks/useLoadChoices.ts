import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppDispatch } from '../store/storeHooks';
import { fetchChoicesThunk } from '../store/slices/gameSlice';
import { useApiErrorHandler } from '../hooks/useApiErrorHandler';

type Options = {
  /** fire automatically on mount */
  auto?: boolean;
};

export function useLoadChoices(options: Options = {}) {
  const { auto = true } = options;

  const dispatch = useAppDispatch();
  const handleApiError = useApiErrorHandler();

  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      await dispatch(fetchChoicesThunk()).unwrap();
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  }, [dispatch, handleApiError]);

  useEffect(() => {
    if (auto) void load();
  }, [auto, load]);

  return {
    loading,
    reload: load,
  };
}
