import React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import MuiBox from '../../../../muiComponents/MuiBox';
import MuiGrid from '../../../../muiComponents/MuiGrid';
import type { KPIItem } from '../DashboardEntity';

export interface DashboardKPISectionProps {
  kpis?: KPIItem[];
}

export const DashboardKPISection: React.FC<DashboardKPISectionProps> = ({ kpis = [] }) => {
  return (
    <MuiGrid container spacing={2.5}>
      {kpis.map((kpi, index) => (
        <MuiGrid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              bgcolor: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
              },
            }}
          >
            <MuiBox sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                {kpi.label}
              </Typography>
              <MuiBox
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  bgcolor: kpi.color || 'primary.main',
                }}
              />
            </MuiBox>

            <Typography variant="h4" sx={{ fontWeight: 800, color: 'text.primary', letterSpacing: '-0.5px', mb: 1 }}>
              {kpi.value}
            </Typography>

            {kpi.change && (
              <MuiBox sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                {kpi.isPositive ? (
                  <TrendingUpIcon sx={{ fontSize: 16, color: 'success.main' }} />
                ) : (
                  <TrendingDownIcon sx={{ fontSize: 16, color: 'warning.main' }} />
                )}
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 600,
                    color: kpi.isPositive ? 'success.main' : 'warning.main',
                  }}
                >
                  {kpi.change}
                </Typography>
              </MuiBox>
            )}
          </Paper>
        </MuiGrid>
      ))}
    </MuiGrid>
  );
};

export default DashboardKPISection;
