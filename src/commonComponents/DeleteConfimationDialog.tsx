import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import MuiButton from '../muiComponents/MuiButton';
import MuiBox from '../muiComponents/MuiBox';

export interface DeleteConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<any>;
  title?: string;
  description?: string;
  itemName?: string;
  isLoading?: boolean;
}

export const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title = 'Delete Confirmation',
  description = 'Are you sure you want to delete this record? This action cannot be undone.',
  itemName,
  isLoading = false,
}) => {
  return (
    <Dialog
      open={open}
      onClose={isLoading ? undefined : onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '12px',
          p: 1,
        },
      }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5, pb: 1 }}>
        <MuiBox
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'error.light',
            color: 'error.main',
            p: 1,
            borderRadius: '50%',
          }}
        >
          <WarningAmberIcon />
        </MuiBox>
        <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem' }}>
          {title}
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: itemName ? 1 : 0 }}>
          {description}
        </Typography>
        {itemName && (
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary', mt: 1 }}>
            &ldquo;{itemName}&rdquo;
          </Typography>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <MuiButton variant="outlined" color="inherit" onClick={onClose} disabled={isLoading}>
          Cancel
        </MuiButton>
        <MuiButton
          variant="contained"
          color="error"
          onClick={onConfirm}
          disabled={isLoading}
        >
          {isLoading ? 'Deleting...' : 'Delete'}
        </MuiButton>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
