'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MantineProvider, ScrollArea } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';
import { BaseShell } from '@/components';
import { BaseTheme } from '@/utils';
import { useApp } from '@/hooks';
import { useEffect } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
    },
  },
});

const RootEntry = ({
  isInvalidToken,
  user,
  stats,
  children,
}: {
  isInvalidToken?: boolean;
  user?: IUser;
  children: React.ReactNode;
  stats?: { wordsCount: number; phrasesCount: number };
}) => {
  const { setIsInvalidToken, setUser, setStatsCount, setIsLoading } = useApp();

  useEffect(() => {
    setIsInvalidToken(isInvalidToken);
    setUser(user);
    setStatsCount(stats);

    const timeout = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timeout);
  }, [isInvalidToken, user]);

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider defaultColorScheme="auto" theme={BaseTheme}>
        <Notifications limit={7} autoClose={5000} containerWidth={320} />
        <ModalsProvider
          modalProps={{
            centered: true,
            scrollAreaComponent: ScrollArea.Autosize,
            overlayProps: {
              opacity: 0.55,
              blur: 3,
            },
          }}
          labels={{ confirm: 'Yes', cancel: 'No' }}
        >
          <BaseShell>{children}</BaseShell>
        </ModalsProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
};

export default RootEntry;
