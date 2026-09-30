import Box, { type BoxProps } from '@mui/material/Box';
import React from 'react';

export interface MuiBoxProps extends BoxProps {
  children?: React.ReactNode;
}

export const MuiBox: React.FC<MuiBoxProps> = ({ children, sx, ...props }) => {
  return (
    <Box sx={sx} {...props}>
      {children}
    </Box>
  );
};

export default MuiBox;
