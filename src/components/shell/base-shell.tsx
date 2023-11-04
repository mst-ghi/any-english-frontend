import { ActionIcon, AppShell, useMantineColorScheme } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { useApp, useThemeStyle } from '@/hooks';
import { PageHeader } from '.';
import { FadeTransition, FullLoader } from '..';
import { useMemo } from 'react';

const BaseShell = ({ children }: { children?: React.ReactNode }) => {
  const pathName = usePathname();
  const { isDesktop } = useThemeStyle();
  const { isLoading, isAdmin, isOperator } = useApp();
  const { colorScheme } = useMantineColorScheme();

  const isAddBtnVisible = useMemo(() => {
    return (
      (isAdmin || isOperator) &&
      isDesktop &&
      pathName !== '/new-word' &&
      !pathName.includes('/profile')
    );
  }, [pathName, isLoading, isAdmin, isOperator, isDesktop]);

  return (
    <AppShell padding={isDesktop ? 'lg' : 'sm'}>
      {isLoading && <FullLoader />}

      <FadeTransition mounted={!isLoading}>
        <AppShell.Header>
          <PageHeader />
        </AppShell.Header>

        <AppShell.Main
          bg={colorScheme === 'light' ? 'gray.1' : 'dark.5'}
          pt={isDesktop ? 84 : 72}
          pos="relative"
        >
          {children}
        </AppShell.Main>

        {isAddBtnVisible && (
          <ActionIcon
            size={65}
            pos="fixed"
            right={30}
            bottom={30}
            radius="xl"
            component={Link}
            href="/new-word"
          >
            <IconPlus size={36} />
          </ActionIcon>
        )}
      </FadeTransition>
    </AppShell>
  );
};

export default BaseShell;
