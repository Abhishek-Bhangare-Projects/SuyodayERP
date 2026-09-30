import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import MuiBox from '../../../muiComponents/MuiBox';
import MuiButton from '../../../muiComponents/MuiButton';
import MuiGrid from '../../../muiComponents/MuiGrid';
import { Icons } from '../../../icons/Icons';
import { getAdminDashboardAPI, refreshAdminDashboardAPI } from './DashboadAPI';
import type { AdminDashboardData } from './DashboardEntity';
import { DashboardKPISection } from './dashboardComponents/DashboardKPISection';
import { ERPPipelineCard } from './dashboardComponents/ERPPipelineCard';
import { OperationsDistributionCard } from './dashboardComponents/OperationsDistributionCard';
import { RecentActivityCard } from './dashboardComponents/RecentActivityCard';

export const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<AdminDashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const RefreshIcon = Icons.refreshIcon;

  const fetchDashboard = async (noCache: boolean = false) => {
    try {
      if (!noCache) setLoading(true);
      const data = await getAdminDashboardAPI(noCache);
      setDashboardData(data);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      const resp = await refreshAdminDashboardAPI();
      if (resp?.data) {
        setDashboardData(resp.data);
      } else {
        await fetchDashboard(true);
      }
    } catch (error) {
      console.error('Failed to force refresh dashboard:', error);
      await fetchDashboard(true);
    } finally {
      setRefreshing(false);
    }
  };

  if (loading) {
    return (
      <MuiBox sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: 2 }}>
        <CircularProgress size={40} sx={{ color: 'primary.main' }} />
        <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
          Loading Suryoday ERP Operations Dashboard...
        </Typography>
      </MuiBox>
    );
  }

  return (
    <MuiBox sx={{ maxWidth: 1600, margin: '0 auto' }}>
      {/* Header Bar */}
      <MuiBox
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          gap: 1.5,
          mb: 3.5,
        }}
      >
        <MuiBox>
          <Typography variant="h5" sx={{ fontWeight: 800, color: 'text.primary', letterSpacing: '-0.5px' }}>
            Operations & Plant Overview
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
            Real-time industrial metrics, inventory lifecycle, and manufacturing throughput
          </Typography>
        </MuiBox>

        <MuiButton
          variant="contained"
          onClick={handleRefresh}
          disabled={refreshing}
          startIcon={
            refreshing ? (
              <CircularProgress size={16} sx={{ color: 'inherit' }} />
            ) : (
              <RefreshIcon sx={{ fontSize: '1.2rem' }} />
            )
          }
          sx={{
            bgcolor: 'primary.main',
            color: '#ffffff',
            px: 2.5,
            py: 1,
            borderRadius: '8px',
            fontWeight: 700,
            '&:hover': {
              bgcolor: 'primary.dark',
            },
          }}
        >
          {refreshing ? 'Syncing...' : 'Force Refresh'}
        </MuiButton>
      </MuiBox>

      {/* KPI Section */}
      <MuiBox sx={{ mb: 3.5 }}>
        <DashboardKPISection kpis={dashboardData?.kpis} />
      </MuiBox>

      {/* Charts & Analytical Cards Grid */}
      <MuiGrid container spacing={3} sx={{ mb: 3.5 }}>
        <MuiGrid size={{ xs: 12, md: 6 }}>
          <ERPPipelineCard pipeline={dashboardData?.pipeline} />
        </MuiGrid>
        <MuiGrid size={{ xs: 12, md: 6 }}>
          <OperationsDistributionCard distribution={dashboardData?.distribution} />
        </MuiGrid>
      </MuiGrid>

      {/* Recent Plant Activity Grid */}
      <MuiGrid container spacing={3}>
        <MuiGrid size={{ xs: 12 }}>
          <RecentActivityCard activities={dashboardData?.recentActivities} />
        </MuiGrid>
      </MuiGrid>
    </MuiBox>
  );
};

export default Dashboard;
