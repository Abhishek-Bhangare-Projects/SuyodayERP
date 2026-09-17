import Drawer, { type DrawerProps } from '@mui/material/Drawer';
import React from 'react';

export interface MuiDrawerProps extends DrawerProps {
  children?: React.ReactNode;
}

export const MuiDrawer: React.FC<MuiDrawerProps> = ({ children, sx, ...props }) => {
  return (
    <Drawer sx={sx} {...props}>
      {children}
    </Drawer>
  );
};

export default MuiDrawer;
