import Avatar, { type AvatarProps } from '@mui/material/Avatar';
import React from 'react';

export interface MuiAvatarProps extends AvatarProps {
  name?: string;
}

export const MuiAvatar: React.FC<MuiAvatarProps> = ({ name, children, sx, ...props }) => {
  const getInitials = (str?: string) => {
    if (!str) return 'U';
    const parts = str.trim().split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  return (
    <Avatar sx={{ fontWeight: 700, ...sx }} {...props}>
      {children ?? (name ? getInitials(name) : 'U')}
    </Avatar>
  );
};

export default MuiAvatar;
