
import { Suspense } from 'react';
import Hero from '@/components/Hero';
import NavBar from '@/components/NavBar';

const Index = () => {
  return (
    <div className="min-h-screen">
      <NavBar />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
        <Hero />
      </Suspense>
    </div>
  );
};

export default Index;
