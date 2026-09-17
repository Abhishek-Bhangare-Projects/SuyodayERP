import React from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import MuiBox from '../../muiComponents/MuiBox';
import MuiButton from '../../muiComponents/MuiButton';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <MuiBox
      sx={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        p: 3,
      }}
    >
      <Typography variant="h1" sx={{ fontWeight: 800, fontSize: '6rem', color: 'primary.main', mb: 1 }}>
        404
      </Typography>
      <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary', mb: 1.5 }}>
        Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 440, mb: 3 }}>
        The requested ERP module or page does not exist or has been moved to a new route.
      </Typography>
      <MuiButton variant="contained" onClick={() => navigate('/master/dashboard')}>
        Return to Dashboard
      </MuiButton>
    </MuiBox>
  );
};

export default NotFound;
