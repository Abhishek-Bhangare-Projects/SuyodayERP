import Button, { type ButtonProps } from '@mui/material/Button';
import React from 'react';

export interface MuiButtonProps extends ButtonProps {
  label?: string;
  children?: React.ReactNode;
  to?: string;
}

export const MuiButton: React.FC<MuiButtonProps> = ({
  label,
  children,
  variant = 'contained',
  color = 'primary',
  fullWidth = false,
  sx,
  ...others
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      fullWidth={fullWidth}
      sx={sx}
      {...others}
    >
      {children ?? label}
    </Button>
  );
};

export default MuiButton;
