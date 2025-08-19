import { useLoadChoices } from '../hooks/useLoadChoices';

export const GamePage: React.FC = () => {
  const { loading } = useLoadChoices({
    auto: true,
  });

  return loading ? <div>Loading...</div> : <div>Game time!</div>;
};
