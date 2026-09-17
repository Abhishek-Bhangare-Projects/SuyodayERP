import IconButton, { type IconButtonProps } from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import React from 'react';

export interface MuiIconButtonProps extends IconButtonProps {
  tooltip?: string;
  children: React.ReactNode;
}

export const MuiIconButton: React.FC<MuiIconButtonProps> = ({
  tooltip,
  children,
  ...props
}) => {
  if (tooltip) {
    return (
      <Tooltip title={tooltip} arrow>
        <IconButton {...props}>{children}</IconButton>
      </Tooltip>
    );
  }

  return <IconButton {...props}>{children}</IconButton>;
};

export default MuiIconButton;
