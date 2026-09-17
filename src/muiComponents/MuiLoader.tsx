import CircularProgress from '@mui/material/CircularProgress';
import MuiBox from './MuiBox';
import type { SxProps, Theme } from '@mui/material/styles';
import React from 'react';

export interface MuiLoaderProps {
  sx?: SxProps<Theme>;
  size?: number;
}

export const MuiLoader: React.FC<MuiLoaderProps> = ({ sx, size = 18 }) => {
  return (
    <MuiBox
      sx={[
        {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        ...(Array.isArray(sx) ? sx : [sx ? sx : {}]),
      ]}
    >
      <CircularProgress
        size={size}
        sx={{ color: 'primary.main' }}
      />
    </MuiBox>
  );
};

export default MuiLoader;
