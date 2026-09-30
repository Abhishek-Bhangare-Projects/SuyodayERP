import AppBar, { type AppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NotificationsIcon from '@mui/icons-material/NotificationsNone';
import MuiBox from './MuiBox';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { logout } from '../redux/authSlice';

export interface MuiAppBarProps extends AppBarProps {
  title?: string;
  leftContent?: React.ReactNode;
  unreadNotifications?: number;
  onProfileClick?: () => void;
}

export const MuiAppBar: React.FC<MuiAppBarProps> = ({
  title = 'Suryoday ERP',
  leftContent,
  unreadNotifications = 0,
  onProfileClick,
  ...others
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.auth?.userData);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleMenuClose();
    navigate('/login');
  };

  const userFullName = userData?.fullName || userData?.name || 'ERP Admin';

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length === 0) return 'U';
    const first = parts[0]?.charAt(0) || '';
    const last = parts.length > 1 ? parts[parts.length - 1]?.charAt(0) : '';
    return (first + last).toUpperCase() || 'U';
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.06)',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        color: '#0f172a',
      }}
      {...others}
    >
      <Toolbar
        sx={{
          minHeight: { xs: 56, sm: 64 },
          px: { xs: 2, sm: 3 },
        }}
      >
        {leftContent && (
          <MuiBox sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
            {leftContent}
          </MuiBox>
        )}

        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontWeight: 700,
            fontSize: '1.15rem',
            letterSpacing: '-0.3px',
            color: '#0f172a',
          }}
        >
          {title}
        </Typography>

        <IconButton
          sx={{
            mr: 1.5,
            width: 38,
            height: 38,
            color: 'text.secondary',
            backgroundColor: 'rgba(0, 0, 0, 0.02)',
            border: '1px solid #e2e8f0',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.06)',
              color: 'text.primary',
            },
          }}
        >
          <Badge badgeContent={unreadNotifications} color="error" max={99}>
            <NotificationsIcon sx={{ fontSize: 20 }} />
          </Badge>
        </IconButton>

        {/* Profile Button */}
        <MuiBox
          onClick={handleProfileMenuOpen}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.25,
            px: 1.5,
            py: 0.6,
            borderRadius: '24px',
            cursor: 'pointer',
            backgroundColor: 'rgba(0, 0, 0, 0.02)',
            border: '1px solid #e2e8f0',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.06)',
            },
          }}
        >
          <Avatar
            sx={{
              width: 32,
              height: 32,
              fontSize: 12,
              fontWeight: 700,
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
            }}
          >
            {getInitials(userFullName)}
          </Avatar>

          <MuiBox
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
            }}
          >
            <Typography
              variant="caption"
              sx={{
                fontWeight: 600,
                lineHeight: 1.1,
                fontSize: 10,
                letterSpacing: '0.03em',
                textTransform: 'uppercase',
                color: 'text.disabled',
              }}
            >
              Logged in
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 700,
                fontSize: 13,
                lineHeight: 1.2,
                color: 'text.primary',
              }}
            >
              {userFullName}
            </Typography>
          </MuiBox>
        </MuiBox>

        {/* Profile Dropdown Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem
            onClick={() => {
              if (onProfileClick) onProfileClick();
              handleMenuClose();
            }}
          >
            Profile
          </MenuItem>
          <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default MuiAppBar;
