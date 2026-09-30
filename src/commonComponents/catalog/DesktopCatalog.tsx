import {
  Paper,
  Tooltip,
  Typography,
  InputAdornment,
  IconButton,
} from '@mui/material';
import {
  DataGrid,
  type GridColDef,
  type GridPaginationModel,
} from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

import MuiBox from '../../muiComponents/MuiBox';
import MuiButton from '../../muiComponents/MuiButton';
import MuiStack from '../../muiComponents/MuiStack';
import { MuiLoader } from '../../muiComponents/MuiLoader';
import MuiTextInput from '../../muiComponents/MuiTextInput';
import DeleteConfirmationDialog from '../DeleteConfimationDialog';

export interface ExtraAction {
  label?: string;
  icon: React.ReactNode;
  tooltip?: string;
  onClick: (row: any) => void;
  show?: (row: any) => boolean;
  disabled?: (row: any) => boolean;
}

export interface CatalogPageProps {
  HeaderName: string;
  columns: GridColDef[];
  PagingAPIURL?: (payload: any) => Promise<any>;
  PagingAPIKey?: string;
  searchPlaceholder?: string;

  ischeckboxSelection?: boolean;
  isActionButtton?: boolean;

  isViewRecord?: boolean;
  isEditRecord?: boolean;
  isDeleteRecord?: boolean;
  isImport?: boolean;
  isExport?: boolean;
  isReport?: boolean;

  canView?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
  canAdd?: boolean;
  canImport?: boolean;
  canExport?: boolean;

  onAdd?: () => void;
  onEdit?: (row: any) => void;
  onView?: (row: any) => void;
  onDelete?: (row: any, onSuccess?: () => void) => Promise<any> | void;

  onImport?: (onSuccess?: () => void) => void;
  onExport?: ((params?: any) => void) | string;
  onTemplateDownload?: () => void;

  extraActions?: ExtraAction[];
  rowsData?: any[];
}

export const DesktopCatalog: React.FC<CatalogPageProps> = ({
  HeaderName,
  columns = [],
  PagingAPIURL,
  searchPlaceholder,
  ischeckboxSelection = false,
  isActionButtton = true,
  isViewRecord = true,
  isEditRecord = true,
  isDeleteRecord = true,
  isReport = false,
  canView = true,
  canEdit = true,
  canDelete = true,
  canAdd = true,
  onAdd,
  onEdit,
  onView,
  onDelete,
  extraActions = [],
  rowsData,
}) => {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [rowToDelete, setRowToDelete] = useState<any | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 400);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const fetchData = async () => {
    if (rowsData) {
      let filtered = [...rowsData];
      if (debouncedSearch) {
        filtered = filtered.filter((item) =>
          JSON.stringify(item).toLowerCase().includes(debouncedSearch.toLowerCase())
        );
      }
      setTotalCount(filtered.length);
      const start = paginationModel.page * paginationModel.pageSize;
      setRows(filtered.slice(start, start + paginationModel.pageSize));
      return;
    }

    if (!PagingAPIURL) return;

    try {
      setLoading(true);
      const payload = {
        page: paginationModel.page + 1,
        limit: paginationModel.pageSize,
        search: debouncedSearch,
      };
      const resp = await PagingAPIURL(payload);
      if (resp?.data) {
        setRows(resp.data.list || resp.data.items || resp.data.rows || []);
        setTotalCount(resp.data.total || resp.data.count || 0);
      }
    } catch (err) {
      console.error('Failed to load catalog data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [paginationModel.page, paginationModel.pageSize, debouncedSearch, rowsData]);

  const handleConfirmDelete = async () => {
    if (!rowToDelete || !onDelete) return;
    try {
      setDeleteLoading(true);
      await onDelete(rowToDelete, () => {
        setDeleteDialogOpen(false);
        setRowToDelete(null);
        fetchData();
      });
    } catch (err) {
      console.error('Delete error:', err);
    } finally {
      setDeleteLoading(false);
    }
  };

  const actionColumn: GridColDef = {
    field: 'actions',
    headerName: 'Actions',
    width: 140,
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <MuiStack direction="row" spacing={0.5} alignItems="center">
        {isViewRecord && canView && onView && (
          <Tooltip title="View">
            <IconButton size="small" onClick={() => onView(params.row)}>
              <RemoveRedEyeIcon fontSize="small" sx={{ color: 'text.secondary', fontSize: 18 }} />
            </IconButton>
          </Tooltip>
        )}
        {isEditRecord && canEdit && onEdit && (
          <Tooltip title="Edit">
            <IconButton size="small" onClick={() => onEdit(params.row)}>
              <ModeEditIcon fontSize="small" sx={{ color: 'primary.main', fontSize: 18 }} />
            </IconButton>
          </Tooltip>
        )}
        {isDeleteRecord && canDelete && onDelete && (
          <Tooltip title="Delete">
            <IconButton
              size="small"
              onClick={() => {
                setRowToDelete(params.row);
                setDeleteDialogOpen(true);
              }}
            >
              <DeleteIcon fontSize="small" sx={{ color: 'error.main', fontSize: 18 }} />
            </IconButton>
          </Tooltip>
        )}
        {extraActions?.map((action, idx) => {
          if (action.show && !action.show(params.row)) return null;
          return (
            <Tooltip key={idx} title={action.tooltip || ''}>
              <span>
                <IconButton
                  size="small"
                  disabled={action.disabled ? action.disabled(params.row) : false}
                  onClick={() => action.onClick(params.row)}
                >
                  {action.icon}
                </IconButton>
              </span>
            </Tooltip>
          );
        })}
      </MuiStack>
    ),
  };

  const allColumns = isActionButtton ? [...columns, actionColumn] : columns;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        bgcolor: '#ffffff',
      }}
    >
      <MuiBox
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'stretch', sm: 'center' },
          gap: 2,
          mb: 2.5,
        }}
      >
        <MuiStack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ xs: 'stretch', sm: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary', letterSpacing: '-0.3px' }}>
            {HeaderName}
          </Typography>

          <MuiTextInput
            label=""
            placeholder={searchPlaceholder || `Search ${HeaderName}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              width: { xs: '100%', sm: 260, md: 320 },
              minWidth: 0,
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                height: 38,
                bgcolor: 'background.default',
                fontSize: '13px',
              },
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
                endAdornment: searchQuery ? (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setSearchQuery('')} edge="end">
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ) : null,
              },
            }}
          />
        </MuiStack>

        <MuiBox sx={{ display: 'flex', gap: 1, justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
          {canAdd && onAdd && (
            <MuiButton
              variant="contained"
              onClick={onAdd}
              sx={{ height: 38, px: 2, fontWeight: 700 }}
            >
              Add {HeaderName}
            </MuiButton>
          )}
        </MuiBox>
      </MuiBox>

      <MuiBox sx={{ width: '100%', minHeight: 350 }}>
        <DataGrid
          rows={rows}
          columns={allColumns}
          loading={loading}
          paginationMode={isReport ? 'client' : 'server'}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[10, 25, 50, 100]}
          rowCount={totalCount}
          checkboxSelection={ischeckboxSelection}
          disableRowSelectionOnClick
          autoHeight
          getRowHeight={() => 'auto'}
          localeText={{ noRowsLabel: 'No records found' }}
          slots={{ loadingOverlay: MuiLoader }}
          sx={{
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: 'rgba(2, 132, 199, 0.05)',
              borderBottom: '1px solid #e2e8f0',
              fontWeight: 700,
            },
            '& .MuiDataGrid-columnHeader': {
              fontWeight: 700,
              fontSize: '0.875rem',
              color: 'text.primary',
            },
            '& .MuiDataGrid-cell': {
              fontSize: '0.875rem',
              color: 'text.secondary',
              py: 1,
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: 'rgba(2, 132, 199, 0.04)',
            },
          }}
        />
      </MuiBox>

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        isLoading={deleteLoading}
        onClose={() => {
          setDeleteDialogOpen(false);
          setRowToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        itemName={rowToDelete?.name || rowToDelete?.title || rowToDelete?.id}
      />
    </Paper>
  );
};

export default DesktopCatalog;
