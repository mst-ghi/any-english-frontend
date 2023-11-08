'use client';

import { useRouter } from 'next/navigation';
import { Fragment, useEffect } from 'react';
import { FullLoader } from '@/components';
import { useApp } from '@/hooks';
import { Box } from '@mantine/core';

function ProfileLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isLoggedIn, isLoading } = useApp();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/auth/login');
    }
  }, [isLoggedIn]);

  return (
    <Fragment>
      {(isLoading || !isLoggedIn) && <FullLoader />}
      {!isLoading && isLoggedIn && <Box>{children}</Box>}
    </Fragment>
  );
}

export default ProfileLayout;
