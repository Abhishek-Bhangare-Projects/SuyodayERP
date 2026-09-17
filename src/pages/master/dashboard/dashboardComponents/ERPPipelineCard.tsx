import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import MuiBox from '../../../../muiComponents/MuiBox';
import MuiStack from '../../../../muiComponents/MuiStack';
import type { PipelineStage } from '../DashboardEntity';

export interface ERPPipelineCardProps {
  pipeline?: PipelineStage[];
}

export const ERPPipelineCard: React.FC<ERPPipelineCardProps> = ({ pipeline = [] }) => {
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
          Manufacturing & Order Pipeline
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Current lifecycle stages across active batches
        </Typography>
      </MuiBox>

      <MuiStack spacing={2.5}>
        {pipeline.map((stage, idx) => (
          <MuiBox key={idx}>
            <MuiBox sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                {stage.stage}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.secondary' }}>
                {stage.count} batches ({stage.percentage}%)
              </Typography>
            </MuiBox>
            <LinearProgress
              variant="determinate"
              value={stage.percentage}
              sx={{
                height: 8,
                borderRadius: 4,
                bgcolor: '#f1f5f9',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 4,
                  bgcolor: idx === 0 ? '#0284c7' : idx === 1 ? '#f59e0b' : idx === 2 ? '#10b981' : '#6366f1',
                },
              }}
            />
          </MuiBox>
        ))}
      </MuiStack>
    </Paper>
  );
};

export default ERPPipelineCard;
