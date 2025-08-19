import { useApiErrorHandler } from '../hooks/useApiErrorHandler';
import { useAppDispatch } from '../store/storeHooks';

export const GamePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const handleApiError = useApiErrorHandler();

  return <div>Game time!</div>;
};
