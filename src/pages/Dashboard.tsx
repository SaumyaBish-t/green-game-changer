
import { Suspense } from 'react';
import NavBar from '@/components/NavBar';
import Dashboard from '@/components/Dashboard';

const DashboardPage = () => {
  return (
    <div className="min-h-screen">
      <NavBar />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
        <Dashboard />
      </Suspense>
    </div>
  );
};

export default DashboardPage;
