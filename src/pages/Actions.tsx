
import { Suspense } from 'react';
import NavBar from '@/components/NavBar';
import ActionTracker from '@/components/ActionTracker';

const ActionsPage = () => {
  return (
    <div className="min-h-screen">
      <NavBar />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
        <ActionTracker />
      </Suspense>
    </div>
  );
};

export default ActionsPage;
