import Modal, { type ModalProps } from '@mui/material/Modal';
import React from 'react';
import MuiBox from './MuiBox';

export interface MuiPopUpProps extends Omit<ModalProps, 'children'> {
  children?: React.ReactNode;
  width?: number | string;
}

export const MuiPopUp: React.FC<MuiPopUpProps> = ({
  open,
  onClose,
  children,
  width = 500,
  sx,
  ...props
}) => {
  return (
    <Modal open={open} onClose={onClose} {...props}>
      <MuiBox
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: width,
          maxWidth: '92vw',
          maxHeight: '90vh',
          overflowY: 'auto',
          bgcolor: 'background.paper',
          borderRadius: '12px',
          boxShadow: 24,
          p: { xs: 2.5, sm: 3.5 },
          outline: 'none',
          ...sx,
        }}
      >
        {children}
      </MuiBox>
    </Modal>
  );
};

export default MuiPopUp;
