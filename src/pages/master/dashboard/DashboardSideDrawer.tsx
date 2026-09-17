import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import MuiBox from '../../../muiComponents/MuiBox';
import MuiDrawer from '../../../muiComponents/MuiDrawer';
import { Icons, type IconKey } from '../../../icons/Icons';
import { usePermission } from '../../../hooks/usePermission';

export interface MenuItem {
  label: string;
  path?: string;
  iconKey?: IconKey;
  resource?: string;
  action?: string;
  children?: MenuItem[];
}

export interface MenuSection {
  title: string;
  items: MenuItem[];
}

interface DashboardSideDrawerProps {
  open?: boolean;
  onClose?: () => void;
  sidebarExpanded?: boolean;
  onToggleSidebar?: () => void;
  variant?: 'permanent' | 'temporary' | 'persistent';
}

const erpNavigationSections: MenuSection[] = [
  {
    title: 'CORE ERP',
    items: [
      {
        label: 'Dashboard Overview',
        path: '/master/dashboard',
        iconKey: 'dashboardIcon',
        resource: 'dashboard',
      },
      {
        label: 'User Management',
        path: '/master/users',
        iconKey: 'customersIcon',
        resource: 'users',
      },
      {
        label: 'Roles & Permissions',
        path: '/master/roles',
        iconKey: 'rolesIcon',
        resource: 'roles',
      },
    ],
  },
  {
    title: 'OPERATIONS & INVENTORY',
    items: [
      {
        label: 'Products Catalog',
        path: '/master/products',
        iconKey: 'productsIcon',
        resource: 'products',
      },
      {
        label: 'Inventory Control',
        path: '/master/inventory',
        iconKey: 'inventoryIcon',
        resource: 'inventory',
      },
      {
        label: 'Manufacturing Lines',
        path: '/master/manufacturing',
        iconKey: 'manufacturingIcon',
        resource: 'manufacturing',
      },
      {
        label: 'Logistics & Dispatch',
        path: '/master/logistics',
        iconKey: 'logisticsIcon',
        resource: 'logistics',
      },
    ],
  },
  {
    title: 'SYSTEM & SETTINGS',
    items: [
      {
        label: 'System Configuration',
        path: '/master/system-config',
        iconKey: 'systemConfigIcon',
        resource: 'systemconfig',
      },
    ],
  },
];

export const DashboardSideDrawer: React.FC<DashboardSideDrawerProps> = ({
  open = true,
  onClose,
  sidebarExpanded = true,
  onToggleSidebar,
  variant = 'permanent',
}) => {
  const drawerWidth = sidebarExpanded ? 270 : 76;
  const navigate = useNavigate();
  const location = useLocation();
  const { canRead } = usePermission();

  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const checkIsActive = (path?: string) => {
    if (!path) return false;
    return location.pathname === path || (path !== '/master/dashboard' && location.pathname.startsWith(path));
  };

  return (
    <MuiDrawer
      variant={variant}
      open={open}
      onClose={onClose}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          bgcolor: '#ffffff',
          borderRight: '1px solid #e2e8f0',
          transition: 'width 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          overflowX: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        },
      }}
    >
      <MuiBox sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Brand Header */}
        <MuiBox
          sx={{
            minHeight: { xs: 56, sm: 64 },
            display: 'flex',
            alignItems: 'center',
            px: sidebarExpanded ? 2.5 : 1.5,
            borderBottom: '1px solid #e2e8f0',
            bgcolor: '#ffffff',
          }}
        >
          <MuiBox sx={{ display: 'flex', alignItems: 'center', gap: 1.5, width: '100%', overflow: 'hidden' }}>
            <MuiBox
              sx={{
                width: 38,
                height: 38,
                minWidth: 38,
                borderRadius: '8px',
                bgcolor: 'primary.main',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '1.2rem',
                boxShadow: '0 2px 8px rgba(2, 132, 199, 0.3)',
              }}
            >
              S
            </MuiBox>
            {sidebarExpanded && (
              <MuiBox sx={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: 'text.primary', lineHeight: 1.2 }}>
                  SURYODAY
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, fontSize: '10px' }}>
                  INDUSTRIES ERP
                </Typography>
              </MuiBox>
            )}
          </MuiBox>
        </MuiBox>

        {/* Navigation Sections */}
        <MuiBox sx={{ flexGrow: 1, overflowY: 'auto', p: 1.5 }}>
          {erpNavigationSections.map((section, sIdx) => {
            const visibleItems = section.items.filter((item) =>
              item.resource ? canRead(item.resource) : true
            );
            if (visibleItems.length === 0) return null;

            return (
              <MuiBox key={sIdx} sx={{ mb: 2 }}>
                {sidebarExpanded && (
                  <Typography
                    variant="caption"
                    sx={{
                      px: 1.5,
                      py: 0.5,
                      display: 'block',
                      fontWeight: 700,
                      fontSize: '10px',
                      letterSpacing: '0.06em',
                      color: 'text.disabled',
                    }}
                  >
                    {section.title}
                  </Typography>
                )}

                <List disablePadding>
                  {visibleItems.map((item, itemIdx) => {
                    const ItemIcon = item.iconKey ? Icons[item.iconKey] : null;
                    const isActive = checkIsActive(item.path);

                    if (item.children && item.children.length > 0) {
                      const isSubOpen = openSubmenu === item.label;
                      return (
                        <React.Fragment key={itemIdx}>
                          <ListItemButton
                            onClick={() => setOpenSubmenu(isSubOpen ? null : item.label)}
                            sx={{
                              borderRadius: '8px',
                              mb: 0.5,
                              px: sidebarExpanded ? 1.5 : 1,
                              justifyContent: sidebarExpanded ? 'initial' : 'center',
                            }}
                          >
                            {ItemIcon && (
                              <ListItemIcon sx={{ minWidth: 36, color: 'text.secondary' }}>
                                <ItemIcon fontSize="small" />
                              </ListItemIcon>
                            )}
                            {sidebarExpanded && (
                              <>
                                <ListItemText
                                  primary={item.label}
                                  primaryTypographyProps={{ fontSize: '0.875rem', fontWeight: 600 }}
                                />
                                {isSubOpen ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
                              </>
                            )}
                          </ListItemButton>

                          {sidebarExpanded && (
                            <Collapse in={isSubOpen} timeout="auto" unmountOnExit>
                              <List disablePadding sx={{ pl: 3 }}>
                                {item.children.map((child, cIdx) => {
                                  const isChildActive = checkIsActive(child.path);
                                  return (
                                    <ListItemButton
                                      key={cIdx}
                                      selected={isChildActive}
                                      onClick={() => {
                                        if (child.path) navigate(child.path);
                                        onClose?.();
                                      }}
                                      sx={{
                                        borderRadius: '8px',
                                        mb: 0.5,
                                        py: 0.75,
                                        '&.Mui-selected': {
                                          bgcolor: 'rgba(2, 132, 199, 0.1)',
                                          color: 'primary.main',
                                          fontWeight: 700,
                                        },
                                      }}
                                    >
                                      <ListItemText
                                        primary={child.label}
                                        primaryTypographyProps={{ fontSize: '0.825rem', fontWeight: isChildActive ? 700 : 500 }}
                                      />
                                    </ListItemButton>
                                  );
                                })}
                              </List>
                            </Collapse>
                          )}
                        </React.Fragment>
                      );
                    }

                    return (
                      <ListItemButton
                        key={itemIdx}
                        selected={isActive}
                        onClick={() => {
                          if (item.path) navigate(item.path);
                          onClose?.();
                        }}
                        sx={{
                          borderRadius: '8px',
                          mb: 0.5,
                          px: sidebarExpanded ? 1.5 : 1,
                          justifyContent: sidebarExpanded ? 'initial' : 'center',
                          color: isActive ? 'primary.main' : 'text.secondary',
                          bgcolor: isActive ? 'rgba(2, 132, 199, 0.08)' : 'transparent',
                          '&:hover': {
                            bgcolor: isActive ? 'rgba(2, 132, 199, 0.12)' : 'rgba(0, 0, 0, 0.04)',
                          },
                          '&.Mui-selected': {
                            bgcolor: 'rgba(2, 132, 199, 0.1)',
                            color: 'primary.main',
                            '&:hover': {
                              bgcolor: 'rgba(2, 132, 199, 0.14)',
                            },
                          },
                        }}
                      >
                        {ItemIcon && (
                          <ListItemIcon
                            sx={{
                              minWidth: 36,
                              color: isActive ? 'primary.main' : 'text.secondary',
                              justifyContent: 'center',
                            }}
                          >
                            <ItemIcon fontSize="small" />
                          </ListItemIcon>
                        )}
                        {sidebarExpanded && (
                          <ListItemText
                            primary={item.label}
                            primaryTypographyProps={{
                              fontSize: '0.875rem',
                              fontWeight: isActive ? 700 : 600,
                            }}
                          />
                        )}
                      </ListItemButton>
                    );
                  })}
                </List>
              </MuiBox>
            );
          })}
        </MuiBox>

        {/* Bottom Expand/Collapse Button */}
        {variant !== 'temporary' && onToggleSidebar && (
          <MuiBox
            sx={{
              p: 1.5,
              borderTop: '1px solid #e2e8f0',
              display: 'flex',
              justifyContent: sidebarExpanded ? 'flex-end' : 'center',
            }}
          >
            <IconButton
              size="small"
              onClick={onToggleSidebar}
              sx={{
                bgcolor: 'rgba(0, 0, 0, 0.03)',
                '&:hover': { bgcolor: 'rgba(2, 132, 199, 0.1)' },
              }}
            >
              {sidebarExpanded ? <KeyboardDoubleArrowLeftIcon fontSize="small" /> : <KeyboardDoubleArrowRightIcon fontSize="small" />}
            </IconButton>
          </MuiBox>
        )}
      </MuiBox>
    </MuiDrawer>
  );
};

export default DashboardSideDrawer;
