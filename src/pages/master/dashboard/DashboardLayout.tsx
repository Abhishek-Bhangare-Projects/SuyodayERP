import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MuiBox from '../../../muiComponents/MuiBox';
import MuiAppBar from '../../../muiComponents/MuiAppBar';
import DashboardSideDrawer from './DashboardSideDrawer';

export const DashboardLayout: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  const drawerWidth = isMobile ? 0 : sidebarExpanded ? 270 : 76;

  const handleDrawerToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setSidebarExpanded(!sidebarExpanded);
    }
  };

  return (
    <MuiBox sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Top Application Bar */}
      <MuiAppBar
        title="Suryoday Industries ERP"
        leftContent={
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 1 }}
          >
            <MenuIcon />
          </IconButton>
        }
      />

      {/* Side Navigation Drawer (Responsive: Temporary on mobile, Permanent on desktop) */}
      {isMobile ? (
        <DashboardSideDrawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          sidebarExpanded={true}
        />
      ) : (
        <DashboardSideDrawer
          variant="permanent"
          sidebarExpanded={sidebarExpanded}
          onToggleSidebar={() => setSidebarExpanded(!sidebarExpanded)}
        />
      )}

      {/* Main Page Body Outlet */}
      <MuiBox
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3, md: 3.5 },
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: { xs: '56px', sm: '64px' },
          minHeight: 'calc(100vh - 64px)',
          overflowX: 'hidden',
        }}
      >
        <Outlet />
      </MuiBox>
    </MuiBox>
  );
};

export default DashboardLayout;
