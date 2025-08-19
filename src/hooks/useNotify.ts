import type { AlertColor } from '@mui/material';
import { useSnackbar } from 'notistack';

export const useNotify = () => {
  const { enqueueSnackbar } = useSnackbar();

  return (message: string, severity: AlertColor = 'info') => {
    enqueueSnackbar(message, { variant: severity });
  };
};
