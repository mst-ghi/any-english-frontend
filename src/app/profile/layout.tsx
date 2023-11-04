'use client';

import { useRouter } from 'next/navigation';
import { Fragment, useEffect } from 'react';
import { FullLoader, ProfileShell } from '@/components';
import { useApp } from '@/hooks';

function ProfileLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isLoggedIn, isLoading } = useApp();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn]);

  return (
    <Fragment>
      {(isLoading || !isLoggedIn) && <FullLoader />}
      {!isLoading && isLoggedIn && <ProfileShell>{children}</ProfileShell>}
    </Fragment>
  );
}

export default ProfileLayout;
