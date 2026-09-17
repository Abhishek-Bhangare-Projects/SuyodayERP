import Alert, { type AlertColor } from '@mui/material/Alert';
import Snackbar, { type SnackbarOrigin } from '@mui/material/Snackbar';
import React from 'react';

export interface MuiSnackbarProps {
  open: boolean;
  message?: string;
  severity?: AlertColor;
  autoHideDuration?: number;
  onClose?: () => void;
  anchorOrigin?: SnackbarOrigin;
}

export const MuiSnackbar: React.FC<MuiSnackbarProps> = ({
  open,
  message,
  severity = 'info',
  autoHideDuration = 3000,
  onClose,
  anchorOrigin = { vertical: 'top', horizontal: 'right' },
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        sx={{ width: '100%', borderRadius: '8px', fontWeight: 600 }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default MuiSnackbar;
