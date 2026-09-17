import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import MuiBox from '../../../../muiComponents/MuiBox';
import MuiStack from '../../../../muiComponents/MuiStack';
import type { ActivityItem } from '../DashboardEntity';

export interface RecentActivityCardProps {
  activities?: ActivityItem[];
}

export const RecentActivityCard: React.FC<RecentActivityCardProps> = ({ activities = [] }) => {
  const getStatusChip = (status: ActivityItem['status']) => {
    switch (status) {
      case 'completed':
        return <Chip label="Completed" size="small" color="success" variant="outlined" sx={{ fontWeight: 600 }} />;
      case 'in_progress':
        return <Chip label="In Progress" size="small" color="primary" variant="outlined" sx={{ fontWeight: 600 }} />;
      case 'alert':
        return <Chip label="Action Needed" size="small" color="warning" variant="filled" sx={{ fontWeight: 600 }} />;
      default:
        return <Chip label="Pending" size="small" variant="outlined" sx={{ fontWeight: 600 }} />;
    }
  };

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
      <MuiBox sx={{ mb: 2.5 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary', letterSpacing: '-0.3px' }}>
          Recent Plant & Inventory Activity
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Audit trail of recent plant transactions, batches, and system notifications
        </Typography>
      </MuiBox>

      <MuiStack spacing={2}>
        {activities.map((act) => (
          <MuiBox
            key={act.id}
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'flex-start', sm: 'center' },
              gap: 1.5,
              p: 1.75,
              borderRadius: '10px',
              border: '1px solid #f1f5f9',
              bgcolor: 'background.default',
            }}
          >
            <MuiBox>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary' }}>
                {act.title}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.825rem' }}>
                {act.subtitle}
              </Typography>
            </MuiBox>

            <MuiStack direction="row" spacing={1.5} alignItems="center">
              <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 500 }}>
                {act.time}
              </Typography>
              {getStatusChip(act.status)}
            </MuiStack>
          </MuiBox>
        ))}
      </MuiStack>
    </Paper>
  );
};

export default RecentActivityCard;
