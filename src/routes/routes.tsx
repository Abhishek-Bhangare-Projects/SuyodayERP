import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoutes';
import Login from '../pages/master/login/Login';
import DashboardLayout from '../pages/master/dashboard/DashboardLayout';
import Dashboard from '../pages/master/dashboard/Dashboard';
import NotFound from '../pages/notFound/NotFound';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />

      {/* Protected Master ERP Routes */}
      <Route element={<PrivateRoute />}>
        <Route path="/master" element={<DashboardLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          {/* Subsequent modules (Products, Inventory, Manufacturing, Users, Roles) will plug in here */}
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
