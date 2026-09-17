import React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import MuiBox from '../../../../muiComponents/MuiBox';

export const CustomerDetailsReport: React.FC = () => {
  return (
    <MuiBox sx={{ maxWidth: 1600, margin: '0 auto' }}>
      <Paper sx={{ p: 3, borderRadius: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary', mb: 1 }}>
          Customer Details
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Customer directory, contact & transaction logs
        </Typography>
      </Paper>
    </MuiBox>
  );
};

export default CustomerDetailsReport;
