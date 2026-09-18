import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import MuiBox from '../../../muiComponents/MuiBox';
import MuiDrawer from '../../../muiComponents/MuiDrawer';
import { Icons, type IconKey } from '../../../icons/Icons';
import { usePermission } from '../../../hooks/usePermission';
import { useAppDispatch } from '../../../hooks/reduxHooks';
import { logout } from '../../../redux/authSlice';

export interface MenuItem {
  label: string;
  path?: string;
  iconKey?: IconKey;
  resource?: string;
  action?: string;
  children?: MenuItem[];
}

export interface MenuSection {
  title?: string;
  items: MenuItem[];
}

interface DashboardSideDrawerProps {
  open?: boolean;
  onClose?: () => void;
  sidebarExpanded?: boolean;
  onToggleSidebar?: () => void;
  variant?: 'permanent' | 'temporary' | 'persistent';
}

export const erpNavigation: MenuItem[] = [
  {
    label: 'Dashboard',
    path: '/master/dashboard',
    iconKey: 'dashboardIcon',
    resource: 'dashboard',
  },
  {
    label: 'Inward',
    path: '/inward',
    iconKey: 'inwardIcon',
    resource: 'inward',
  },

  {
    label: 'OutWard',
    path: '/outward',
    iconKey: 'outwardIcon',
    resource: 'outward',
  },

  {
    label: 'Master',
    iconKey: 'masterIcon',
    resource: 'master',
    children: [
      { label: 'Po Item Master', path: '/master/po-item', resource: 'po_item' },
      { label: 'Item Master', path: '/master/item', resource: 'item' },
      { label: 'Item Category', path: '/master/item-category', resource: 'item_category' },
      { label: 'Unit Master', path: '/master/unit', resource: 'unit' },
      { label: 'PO Master', path: '/master/po', resource: 'po_master' },
      { label: 'pur customers Master', path: '/master/pur-customers', resource: 'pur_customers' },
      { label: 'Hsn Master', path: '/master/hsn', resource: 'hsn' },
      { label: 'Employee', path: '/master/employee', resource: 'employee' },
      { label: 'Supplier Details', path: '/master/supplier-details', resource: 'supplier' },
      { label: 'Customer Master', path: '/master/customer', resource: 'customer' },
      { label: 'PO Closing', path: '/master/po-closing', resource: 'po_closing' },
      { label: 'Add Bom', path: '/master/add-bom', resource: 'bom' },
    ],
  },

  {
    label: 'Purchase',
    iconKey: 'purchaseIcon',
    resource: 'purchase',
    children: [
      { label: 'Purchase Inward', path: '/purchase/inward', resource: 'purchase_inward' },
      { label: 'Purchase order', path: '/purchase/order', resource: 'purchase_order' },
      { label: 'Purchase Return', path: '/purchase/return', resource: 'purchase_return' },
      { label: 'Purchases Outword', path: '/purchase/outward', resource: 'purchase_outward' },
    ],
  },


  {
    label: 'Accounting',
    iconKey: 'accountingIcon',
    resource: 'accounting',
    children: [
      { label: 'Customer Payment Received Entry', path: '/accounting/customer-payment-received', resource: 'customer_payment' },
      { label: 'Customer Entry', path: '/accounting/customer-entry', resource: 'customer_entry' },
      { label: 'Supplier Ledger', path: '/accounting/supplier-ledger', resource: 'supplier_ledger' },
      { label: 'Account', path: '/accounting/account', resource: 'account_master' },
      { label: 'Deposite Voucher', path: '/accounting/deposit-voucher', resource: 'deposit_voucher' },
      { label: 'Withdraw Voucher', path: '/accounting/withdraw-voucher', resource: 'withdraw_voucher' },
      { label: 'Expences Details', path: '/accounting/expenses-details', resource: 'expenses' },
      { label: 'Customer Quotation', path: '/accounting/customer-quotation', resource: 'quotation' },
      { label: 'Customer Ledger Record', path: '/accounting/customer-ledger-record', resource: 'customer_ledger_record' },
      { label: 'Supplier Ledger Record', path: '/accounting/supplier-ledger-record', resource: 'supplier_ledger_record' },
    ],
  },

  {
    label: 'Reports',
    iconKey: 'reportsIcon',
    resource: 'reports',
    children: [
      { label: 'Po Stock', path: '/reports/po-stock', resource: 'po_stock_report' },
      { label: 'Datewise Po Stock', path: '/reports/datewise-po-stock', resource: 'datewise_po_stock_report' },
      { label: 'Purchase Stock', path: '/reports/purchase-stock', resource: 'purchase_stock_report' },
      { label: 'Outword summary Report', path: '/reports/outward-summary', resource: 'outward_summary_report' },
      { label: 'Itemwise Outword summary Report', path: '/reports/itemwise-outward-summary', resource: 'itemwise_outward_summary_report' },
      { label: 'Inword summary Report', path: '/reports/inward-summary', resource: 'inward_summary_report' },
      { label: 'Itemwise Inword summary Report', path: '/reports/itemwise-inward-summary', resource: 'itemwise_inward_summary_report' },
      { label: 'Itemwise Purchase summary Report', path: '/reports/itemwise-purchase-summary', resource: 'itemwise_purchase_summary_report' },
      { label: 'Purchase summary Report', path: '/reports/purchase-summary', resource: 'purchase_summary_report' },
      { label: 'Customer Details', path: '/reports/customer-details', resource: 'customer_details_report' },
      { label: 'Payment Received Report', path: '/reports/payment-received', resource: 'payment_received_report' },
      { label: 'Outstanding payment report', path: '/reports/outstanding-payment', resource: 'outstanding_payment_report' },
    ],
  },

  {
    label: 'Setting',
    iconKey: 'settingsIcon',
    resource: 'setting',
    children: [
      { label: 'Create User', path: '/setting/create-user', resource: 'create_user' },
      { label: 'Tally Export', path: '/setting/tally-export', resource: 'tally_export' },
      { label: 'Barcode Print', path: '/setting/barcode-print', resource: 'barcode_print' },
      { label: 'Company Details', path: '/setting/company-details', resource: 'company_details' },
    ],
  }
];

export const DashboardSideDrawer: React.FC<DashboardSideDrawerProps> = ({
  open = true,
  onClose,
  sidebarExpanded = true,
  onToggleSidebar,
  variant = 'permanent',
}) => {
  const drawerWidth = sidebarExpanded ? 280 : 76;
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { canRead } = usePermission();

  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState('');

  // Auto-expand parent section matching current route
  // useEffect(() => {
  //   const currentPath = location.pathname;
  //   erpNavigation.forEach((item) => {
  //     if (item.children) {
  //       const hasActiveChild = item.children.some(
  //         (child) => child.path === currentPath || (child.path && currentPath.startsWith(child.path))
  //       );
  //       if (hasActiveChild) {
  //         setOpenSubmenus((prev) => ({ ...prev, [item.label]: true }));
  //       }
  //     }
  //   });
  // }, [location.pathname]);

  // Auto-expand only the parent section matching the current route.
  // Close all other submenus when navigating to another section.
  useEffect(() => {
    const currentPath = location.pathname;

    const activeParent = erpNavigation.find((item) => {
      if (!item.children) return false;

      return item.children.some(
        (child) =>
          child.path === currentPath ||
          (child.path && currentPath.startsWith(child.path + '/'))
      );
    });

    setOpenSubmenus(() => {
      if (activeParent) {
        return {
          [activeParent.label]: true,
        };
      }

      // No child is active (e.g. Dashboard, Inward, OutWard)
      // so close all submenus.
      return {};
    });
  }, [location.pathname]);

  const toggleSubmenu = (label: string) => {
    setOpenSubmenus((prev) => {
      const isCurrentlyOpen = Boolean(prev[label]);
      // Close all other submenus, toggle the clicked one (accordion behavior)
      const newState: Record<string, boolean> = {};
      Object.keys(prev).forEach((key) => {
        newState[key] = false;
      });
      newState[label] = !isCurrentlyOpen;
      return newState;
    });
  };

  const checkIsActive = (path?: string) => {
    if (!path) return false;
    if (location.pathname === path) return true;
    // Prevent prefix collision: only match if followed by '/' or end of string
    if (path === '/master/dashboard' || path === '/dashboard') return false;
    const normalizedPath = path.endsWith('/') ? path : path + '/';
    return location.pathname.startsWith(normalizedPath);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
    onClose?.();
  };

  // Filter items based on search query
  const filteredNavigation = useMemo(() => {
    if (!searchQuery.trim()) {
      return erpNavigation;
    }
    const query = searchQuery.toLowerCase();
    return erpNavigation
      .map((item) => {
        if (item.label.toLowerCase().includes(query)) {
          return item;
        }
        if (item.children) {
          const matchingChildren = item.children.filter((child) =>
            child.label.toLowerCase().includes(query)
          );
          if (matchingChildren.length > 0) {
            return {
              ...item,
              children: matchingChildren,
            };
          }
        }
        return null;
      })
      .filter((item): item is MenuItem => item !== null);
  }, [searchQuery]);

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
      <MuiBox sx={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
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
          <MuiBox
            onClick={() => navigate('/master/dashboard')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              width: '100%',
              overflow: 'hidden',
              cursor: 'pointer',
            }}
          >
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
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, fontSize: '10px', letterSpacing: '0.05em' }}>
                  INDUSTRIES ERP
                </Typography>
              </MuiBox>
            )}
          </MuiBox>
        </MuiBox>

        {/* Quick Menu Search (when expanded) */}
        {sidebarExpanded && (
          <MuiBox sx={{ px: 2, pt: 1.5, pb: 0.5 }}>
            <TextField
              size="small"
              fullWidth
              placeholder="Search ERP menus..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                  endAdornment: searchQuery ? (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={() => setSearchQuery('')}>
                        <ClearIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    </InputAdornment>
                  ) : null,
                  sx: {
                    fontSize: '0.8125rem',
                    borderRadius: '8px',
                    bgcolor: '#f8fafc',
                    '& fieldset': { borderColor: '#e2e8f0' },
                    '&:hover fieldset': { borderColor: 'primary.main' },
                  },
                },
              }}
            />
          </MuiBox>
        )}

        {/* Navigation Items List */}
        <MuiBox sx={{ flexGrow: 1, overflowY: 'auto', p: 1.5 }}>
          <List disablePadding>
            {filteredNavigation.map((item, itemIdx) => {
              const ItemIcon = item.iconKey ? Icons[item.iconKey] : null;
              const hasChildren = item.children && item.children.length > 0;
              const isSubOpen = Boolean(openSubmenus[item.label] || searchQuery.trim().length > 0);

              // Check if any child of this item is currently active
              const isChildActive = hasChildren && item.children?.some((child) => checkIsActive(child.path));
              const isActive = checkIsActive(item.path) || isChildActive;

              // Top-level menu with Children (Dropdown)
              if (hasChildren) {
                return (
                  <React.Fragment key={itemIdx}>
                    <Tooltip title={!sidebarExpanded ? item.label : ''} placement="right" arrow>
                      <ListItemButton
                        onClick={() => {
                          if (!sidebarExpanded && onToggleSidebar) {
                            onToggleSidebar();
                          }
                          toggleSubmenu(item.label);
                        }}
                        sx={{
                          borderRadius: '8px',
                          mb: 0.5,
                          px: sidebarExpanded ? 1.5 : 1,
                          py: 1,
                          justifyContent: sidebarExpanded ? 'initial' : 'center',
                          bgcolor: isChildActive ? 'rgba(2, 132, 199, 0.05)' : 'transparent',
                          color: isChildActive ? 'primary.main' : 'text.primary',
                          '&:hover': {
                            bgcolor: isChildActive ? 'rgba(2, 132, 199, 0.1)' : 'rgba(0, 0, 0, 0.04)',
                          },
                        }}
                      >
                        {ItemIcon && (
                          <ListItemIcon
                            sx={{
                              minWidth: sidebarExpanded ? 36 : 'auto',
                              color: isChildActive ? 'primary.main' : 'text.secondary',
                              justifyContent: 'center',
                            }}
                          >
                            <ItemIcon fontSize="small" />
                          </ListItemIcon>
                        )}
                        {sidebarExpanded && (
                          <>
                            <ListItemText
                              primary={item.label}
                              primaryTypographyProps={{
                                fontSize: '0.875rem',
                                fontWeight: isChildActive ? 700 : 600,
                              }}
                            />
                            {item.children && (
                              <Chip
                                label={item.children.length}
                                size="small"
                                sx={{
                                  height: 18,
                                  fontSize: '0.65rem',
                                  fontWeight: 700,
                                  mr: 0.5,
                                  bgcolor: 'rgba(0, 0, 0, 0.03)',
                                  color: 'text.secondary',
                                }}
                              />
                            )}
                            {isSubOpen ? (
                              <ExpandLess fontSize="small" sx={{ color: 'text.secondary' }} />
                            ) : (
                              <ExpandMore fontSize="small" sx={{ color: 'text.secondary' }} />
                            )}
                          </>
                        )}
                      </ListItemButton>
                    </Tooltip>

                    {/* Submenu Items List */}
                    {sidebarExpanded && (
                      <Collapse in={isSubOpen} timeout="auto" unmountOnExit>
                        <List disablePadding sx={{ pl: 2, mb: 0.5 }}>
                          {item.children?.map((child, cIdx) => {
                            const isThisChildActive = checkIsActive(child.path);
                            return (
                              <ListItemButton
                                key={cIdx}
                                selected={isThisChildActive}
                                onClick={() => {
                                  if (child.path) navigate(child.path);
                                  onClose?.();
                                }}
                                sx={{
                                  borderRadius: '6px',
                                  mb: 0.3,
                                  py: 0.6,
                                  px: 1.5,
                                  '&.Mui-selected': {
                                    bgcolor: 'rgba(2, 132, 199, 0.12)',
                                    color: 'primary.main',
                                    fontWeight: 700,
                                    '&:hover': {
                                      bgcolor: 'rgba(2, 132, 199, 0.18)',
                                    },
                                  },
                                  '&:hover': {
                                    bgcolor: 'rgba(0, 0, 0, 0.04)',
                                  },
                                }}
                              >
                                <ListItemIcon sx={{ minWidth: 20 }}>
                                  <FiberManualRecordIcon
                                    sx={{
                                      fontSize: isThisChildActive ? 8 : 6,
                                      color: isThisChildActive ? 'primary.main' : 'text.disabled',
                                    }}
                                  />
                                </ListItemIcon>
                                <ListItemText
                                  primary={child.label}
                                  primaryTypographyProps={{
                                    fontSize: '0.8125rem',
                                    fontWeight: isThisChildActive ? 700 : 500,
                                    color: isThisChildActive ? 'primary.main' : 'text.secondary',
                                  }}
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

              // Single Direct Menu Item (e.g., Dashboard, Inward, OutWard)
              return (
                <Tooltip key={itemIdx} title={!sidebarExpanded ? item.label : ''} placement="right" arrow>
                  <ListItemButton
                    selected={isActive}
                    onClick={() => {
                      if (item.path) navigate(item.path);
                      onClose?.();
                    }}
                    sx={{
                      borderRadius: '8px',
                      mb: 0.5,
                      px: sidebarExpanded ? 1.5 : 1,
                      py: 1,
                      justifyContent: sidebarExpanded ? 'initial' : 'center',
                      color: isActive ? 'primary.main' : 'text.primary',
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
                          minWidth: sidebarExpanded ? 36 : 'auto',
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
                </Tooltip>
              );
            })}
          </List>
        </MuiBox>

        {/* Bottom Bar: Sign Out & Collapse Button */}
        <MuiBox sx={{ borderTop: '1px solid #e2e8f0', p: 1.5, bgcolor: '#ffffff' }}>
          {/* Sign Out Button */}
          <Tooltip title={!sidebarExpanded ? 'Sign Out' : ''} placement="right" arrow>
            <ListItemButton
              onClick={handleLogout}
              sx={{
                borderRadius: '8px',
                mb: 1,
                px: sidebarExpanded ? 1.5 : 1,
                py: 0.75,
                justifyContent: sidebarExpanded ? 'initial' : 'center',
                color: 'error.main',
                '&:hover': {
                  bgcolor: 'rgba(239, 68, 68, 0.08)',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: sidebarExpanded ? 36 : 'auto',
                  color: 'error.main',
                  justifyContent: 'center',
                }}
              >
                <Icons.logoutIcon fontSize="small" />
              </ListItemIcon>
              {sidebarExpanded && (
                <ListItemText
                  primary="Sign Out"
                  primaryTypographyProps={{
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: 'error.main',
                  }}
                />
              )}
            </ListItemButton>
          </Tooltip>

          {/* Toggle Expand/Collapse Icon */}
          {variant !== 'temporary' && onToggleSidebar && (
            <MuiBox sx={{ display: 'flex', justifyContent: sidebarExpanded ? 'flex-end' : 'center' }}>
              <IconButton
                size="small"
                onClick={onToggleSidebar}
                sx={{
                  bgcolor: 'rgba(0, 0, 0, 0.03)',
                  '&:hover': { bgcolor: 'rgba(2, 132, 199, 0.1)' },
                }}
              >
                {sidebarExpanded ? (
                  <KeyboardDoubleArrowLeftIcon fontSize="small" />
                ) : (
                  <KeyboardDoubleArrowRightIcon fontSize="small" />
                )}
              </IconButton>
            </MuiBox>
          )}
        </MuiBox>
      </MuiBox>
    </MuiDrawer>
  );
};

export default DashboardSideDrawer;
