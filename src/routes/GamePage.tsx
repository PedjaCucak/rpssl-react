import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../store/storeHooks';
import { useLoadChoices } from '../hooks/useLoadChoices';
import { Container, Skeleton, Stack, Typography } from '@mui/material';
import { GameChoiceGrid } from '../components/GameChoiceGrid';
import { Scoreboard } from '../components/Scoreboard';
import { playRoundThunk } from '../store/slices/gameSlice';
import {
  selectLastRound,
  selectPlayStatus,
  selectChoiceNameById,
  selectChoicesStatus,
} from '../store/selectors/gameSelectors';
import { WinnerOverlay } from '../components/WinnerOverlay';
import { useApiErrorHandler } from '../hooks/useApiErrorHandler';
import { useCallback, useEffect, useState } from 'react';
import { detectOutcome } from '../utils/gameOutcome';
import type { OverlayPhase } from '../types/ui';

export const GamePage: React.FC = () => {
  const { loading } = useLoadChoices({ auto: true });
  const dispatch = useAppDispatch();
  const handleApiError = useApiErrorHandler();

  const playStatus = useAppSelector(selectPlayStatus);
  const lastRound = useAppSelector(selectLastRound);
  const getNameById = useAppSelector(selectChoiceNameById);
  const choicesStatus = useAppSelector(selectChoicesStatus);

  const [overlayOpen, setOverlayOpen] = useState(false);
  const [overlayPhase, setOverlayPhase] = useState<OverlayPhase>('pending');
  const [pickedId, setPickedId] = useState<number | null>(null);

  const isChoicesLoading = loading || choicesStatus === 'loading';

  // Open overlay immediately on click
  const handlePick = useCallback(
    async (id: number) => {
      setPickedId(id);
      setOverlayPhase('pending');
      setOverlayOpen(true);
      try {
        await dispatch(playRoundThunk(id)).unwrap();
      } catch (err) {
        handleApiError(err);
      }
    },
    [dispatch, handleApiError]
  );

  // When play succeeds, flip to result and auto-close
  useEffect(() => {
    if (!overlayOpen) return;
    if (playStatus === 'success' && lastRound) {
      setOverlayPhase('result');
      const t = setTimeout(() => setOverlayOpen(false), 1200);
      return () => clearTimeout(t);
    }
    if (playStatus === 'error') {
      setOverlayOpen(false); // in case of error, close
    }
  }, [overlayOpen, playStatus, lastRound]);

  const outcome = detectOutcome(lastRound?.results);
  const playerName =
    overlayPhase === 'pending'
      ? pickedId != null
        ? getNameById(pickedId)
        : ''
      : lastRound
        ? getNameById(lastRound.player)
        : '';
  const computerName =
    overlayPhase === 'result' && lastRound
      ? getNameById(lastRound.computer)
      : undefined;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Stack spacing={3}>
        <Typography variant="h4" fontWeight={700}>
          Rock • Paper • Scissors • Lizard • Spock
        </Typography>

        {isChoicesLoading ? (
          <Stack spacing={2}>
            <Skeleton variant="rounded" height={160} />
            <Skeleton variant="rounded" height={280} />
          </Stack>
        ) : (
          <>
            <GameChoiceGrid onPick={handlePick} />
            <Scoreboard />
          </>
        )}
      </Stack>

      <WinnerOverlay
        open={overlayOpen}
        onClose={() => setOverlayOpen(false)}
        phase={overlayPhase}
        outcome={outcome}
        playerName={playerName}
        computerName={computerName}
      />
    </Container>
  );
};
