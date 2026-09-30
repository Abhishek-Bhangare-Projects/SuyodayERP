import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/routes';

export const App: React.FC = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
