import Grid2, { type Grid2Props } from '@mui/material/Grid2';
import React from 'react';

export interface MuiGridProps extends Grid2Props {
  children?: React.ReactNode;
}

export const MuiGrid: React.FC<MuiGridProps> = ({ children, ...props }) => {
  return <Grid2 {...props}>{children}</Grid2>;
};

export default MuiGrid;
