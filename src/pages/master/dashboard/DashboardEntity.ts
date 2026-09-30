export interface KPIItem {
  label: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  color?: string;
  icon?: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  subtitle: string;
  time: string;
  status: 'completed' | 'in_progress' | 'pending' | 'alert';
}

export interface PipelineStage {
  stage: string;
  count: number;
  percentage: number;
}

export interface DistributionItem {
  category: string;
  count: number;
  percentage: number;
  color?: string;
}

export interface AdminDashboardData {
  kpis: KPIItem[];
  pipeline: PipelineStage[];
  distribution: DistributionItem[];
  recentActivities: ActivityItem[];
}
