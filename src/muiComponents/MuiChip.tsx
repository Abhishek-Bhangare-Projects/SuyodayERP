import Chip, { type ChipProps } from '@mui/material/Chip';
import React from 'react';

export interface MuiChipProps extends ChipProps {}

export const MuiChip: React.FC<MuiChipProps> = ({ size = 'small', sx, ...props }) => {
  return (
    <Chip
      size={size}
      sx={{
        borderRadius: '6px',
        fontWeight: 600,
        fontSize: '0.75rem',
        ...sx,
      }}
      {...props}
    />
  );
};

export default MuiChip;
