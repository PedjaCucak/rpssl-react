import * as React from 'react';
import { useAppSelector } from '../store/storeHooks';
import {
  selectChoices,
  selectPlayStatus,
} from '../store/selectors/gameSelectors';
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from '@mui/material';
import { emojiFor } from '../utils/gameIcons';

interface GameChoiceGridProps {
  onPick?: (id: number) => void;
}

export const GameChoiceGrid: React.FC<GameChoiceGridProps> = ({ onPick }) => {
  const choices = useAppSelector(selectChoices);
  const playStatus = useAppSelector(selectPlayStatus);

  return (
    <Card elevation={2}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Make your move
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: 2,
          }}
        >
          {choices.map((c) => (
            <Button
              key={c.id}
              variant="contained"
              size="large"
              onClick={() => onPick?.(c.id)}
              disabled={playStatus === 'loading'}
              sx={{ py: 2 }}
            >
              <Stack direction="column" alignItems="center" spacing={0.5}>
                <span style={{ fontSize: 28, lineHeight: 1 }}>
                  {emojiFor(c.name)}
                </span>
                <Typography
                  variant="button"
                  sx={{ textTransform: 'capitalize' }}
                >
                  {c.name}
                </Typography>
              </Stack>
            </Button>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};
