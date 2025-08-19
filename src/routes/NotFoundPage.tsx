import * as React from 'react';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const src = '/icon-192.png';

  return (
    <Container
      maxWidth="sm"
      sx={{ height: '100%', display: 'grid', placeItems: 'center' }}
    >
      <Stack spacing={2} alignItems="center" textAlign="center">
        <Box
          component="img"
          src={src}
          alt="404 Not Found"
          sx={{
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        />
        <Typography variant="h4" fontWeight={800}>
          404 Not Found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          The page you&apos;re looking for doesn&apos;t exist or was moved.
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/')}
          sx={{ textTransform: 'none' }}
        >
          Go to Home
        </Button>
      </Stack>
    </Container>
  );
};
