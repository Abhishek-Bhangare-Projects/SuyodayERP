import axiosClient from '../../../axios/axiosClient';
import { URLS } from '../../../url/url';
import type { AdminDashboardData } from './DashboardEntity';

const mockDashboardData: AdminDashboardData = {
  kpis: [
    { label: 'Active Production Units', value: '24 Plant Units', change: '+12% this month', isPositive: true, color: '#0284c7' },
    { label: 'Total Inventory Items', value: '148,290 Units', change: '+5.4% restocked', isPositive: true, color: '#f59e0b' },
    { label: 'Pending Sales Orders', value: '342 Orders', change: '-2.1% backlog', isPositive: true, color: '#10b981' },
    { label: 'Active Machine Lines', value: '98.6% Uptime', change: 'Optimal health', isPositive: true, color: '#8b5cf6' },
  ],
  pipeline: [
    { stage: 'Raw Material Intake', count: 1240, percentage: 35 },
    { stage: 'Assembly & Processing', count: 860, percentage: 25 },
    { stage: 'Quality Inspection', count: 520, percentage: 15 },
    { stage: 'Packaged & Staged', count: 480, percentage: 14 },
    { stage: 'Dispatched Logistics', count: 390, percentage: 11 },
  ],
  distribution: [
    { category: 'Industrial Hardware', count: 450, percentage: 42, color: '#0284c7' },
    { category: 'Electrical Components', count: 280, percentage: 26, color: '#f59e0b' },
    { category: 'Mechanical Spare Parts', count: 210, percentage: 20, color: '#10b981' },
    { category: 'Raw Materials & Alloys', count: 130, percentage: 12, color: '#64748b' },
  ],
  recentActivities: [
    { id: '1', title: 'Batch #SY-2026-981 Released', subtitle: 'Quality clearance approved by Unit Lead', time: '10 mins ago', status: 'completed' },
    { id: '2', title: 'Purchase Order #PO-8820 Issued', subtitle: 'Raw material procurement for Line 3', time: '45 mins ago', status: 'in_progress' },
    { id: '3', title: 'Inventory Reorder Threshold Reached', subtitle: 'Item #AL-400 Aluminium Alloy below 500 units', time: '2 hours ago', status: 'alert' },
    { id: '4', title: 'Dispatch Manifest #DM-4412 Completed', subtitle: 'Shipped to Western Distribution Hub', time: '4 hours ago', status: 'completed' },
  ],
};

export const getAdminDashboardAPI = async (_noCache: boolean = false): Promise<AdminDashboardData> => {
  try {
    const resp = await axiosClient.get(URLS.DASHBOARD.GET_OVERVIEW);
    return resp.data?.data || resp.data || mockDashboardData;
  } catch (err) {
    // Return mock data for initial setup / mock testing
    return mockDashboardData;
  }
};

export const refreshAdminDashboardAPI = async () => {
  try {
    return await axiosClient.post(URLS.DASHBOARD.REFRESH);
  } catch (err) {
    return { data: mockDashboardData };
  }
};
