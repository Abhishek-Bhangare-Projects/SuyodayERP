import Stack, { type StackProps } from '@mui/material/Stack';
import React from 'react';

export interface MuiStackProps extends StackProps {
  children?: React.ReactNode;
}

export const MuiStack: React.FC<MuiStackProps> = ({ children, sx, ...props }) => {
  return (
    <Stack sx={sx} {...props}>
      {children}
    </Stack>
  );
};

export default MuiStack;
