import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import React from 'react';
import MuiBox from '../../muiComponents/MuiBox';

export interface FormCardSectionProps {
  title?: string;
  children: React.ReactNode;
}

export const FormCardSection: React.FC<FormCardSectionProps> = ({ title, children }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 3 },
        mb: 2.5,
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        bgcolor: '#ffffff',
      }}
    >
      {title && (
        <MuiBox sx={{ mb: 2, pb: 1.5, borderBottom: '1px solid #f1f5f9' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.primary' }}>
            {title}
          </Typography>
        </MuiBox>
      )}
      <MuiBox>{children}</MuiBox>
    </Paper>
  );
};

export default FormCardSection;
