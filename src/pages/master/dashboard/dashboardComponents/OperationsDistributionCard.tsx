import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import MuiBox from '../../../../muiComponents/MuiBox';
import MuiStack from '../../../../muiComponents/MuiStack';
import type { DistributionItem } from '../DashboardEntity';

export interface OperationsDistributionCardProps {
  distribution?: DistributionItem[];
}

export const OperationsDistributionCard: React.FC<OperationsDistributionCardProps> = ({ distribution = [] }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        bgcolor: '#ffffff',
        height: '100%',
      }}
    >
      <MuiBox sx={{ mb: 2.5 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary', letterSpacing: '-0.3px' }}>
          Product Category Volume
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Breakdown of registered production inventory
        </Typography>
      </MuiBox>

      {/* Segmented Distribution Bar */}
      <MuiBox
        sx={{
          display: 'flex',
          height: 16,
          borderRadius: '8px',
          overflow: 'hidden',
          mb: 3,
          bgcolor: '#f1f5f9',
        }}
      >
        {distribution.map((item, idx) => (
          <MuiBox
            key={idx}
            sx={{
              width: `${item.percentage}%`,
              bgcolor: item.color || '#0284c7',
              transition: 'width 0.5s ease',
            }}
          />
        ))}
      </MuiBox>

      <MuiStack spacing={1.5}>
        {distribution.map((item, idx) => (
          <MuiBox
            key={idx}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: 1.25,
              borderRadius: '8px',
              bgcolor: 'background.default',
            }}
          >
            <MuiBox sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <MuiBox
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '3px',
                  bgcolor: item.color || '#0284c7',
                }}
              />
              <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                {item.category}
              </Typography>
            </MuiBox>

            <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.secondary' }}>
              {item.count} items ({item.percentage}%)
            </Typography>
          </MuiBox>
        ))}
      </MuiStack>
    </Paper>
  );
};

export default OperationsDistributionCard;
