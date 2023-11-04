'use client';

import { useRouter } from 'next/navigation';
import { Fragment, useEffect } from 'react';
import { EmptyPage, FullLoader } from '@/components';
import { useApp } from '@/hooks';

function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isLoggedIn, isLoading } = useApp();

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn]);

  return (
    <Fragment>
      {(isLoading || isLoggedIn) && <FullLoader />}
      {!isLoading && !isLoggedIn && <EmptyPage>{children}</EmptyPage>}
    </Fragment>
  );
}

export default AuthLayout;
