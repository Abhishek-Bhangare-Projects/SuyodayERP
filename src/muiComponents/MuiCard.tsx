import Card, { type CardProps } from '@mui/material/Card';
import React from 'react';

export interface MuiCardProps extends CardProps {
  children?: React.ReactNode;
}

export const MuiCard: React.FC<MuiCardProps> = ({ children, sx, ...props }) => {
  return (
    <Card sx={sx} {...props}>
      {children}
    </Card>
  );
};

export default MuiCard;
