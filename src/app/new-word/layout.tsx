'use client';

import { useRouter } from 'next/navigation';
import { Fragment, useEffect } from 'react';
import { FullLoader } from '@/components';
import { useApp } from '@/hooks';

function NewWordLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isLoggedIn, isLoading, isAdmin, isOperator } = useApp();

  useEffect(() => {
    if (!isLoggedIn || (!isAdmin && !isOperator)) {
      router.push('/');
    }
  }, [isLoggedIn, isAdmin, isOperator]);

  return (
    <Fragment>
      {(isLoading || !isLoggedIn) && <FullLoader />}
      {!isLoading && isLoggedIn && <Fragment>{children}</Fragment>}
    </Fragment>
  );
}

export default NewWordLayout;
