
import { Suspense } from 'react';
import NavBar from '@/components/NavBar';
import RewardsCard from '@/components/RewardsCard';

const RewardsPage = () => {
  return (
    <div className="min-h-screen">
      <NavBar />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
        <RewardsCard />
      </Suspense>
    </div>
  );
};

export default RewardsPage;
