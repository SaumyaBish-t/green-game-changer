
import { Suspense } from 'react';
import NavBar from '@/components/NavBar';
import UserProfile from '@/components/UserProfile';

const ProfilePage = () => {
  return (
    <div className="min-h-screen">
      <NavBar />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
        <UserProfile />
      </Suspense>
    </div>
  );
};

export default ProfilePage;
