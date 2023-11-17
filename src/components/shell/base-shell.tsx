import { AppShell, Box, useMantineColorScheme } from '@mantine/core';
import { useApp, useThemeStyle } from '@/hooks';
import { PageHeader } from '.';
import { FadeTransition, FullLoader } from '..';

const BaseShell = ({ children }: { children?: React.ReactNode }) => {
  const { isDesktop } = useThemeStyle();
  const { isLoading } = useApp();
  const { colorScheme } = useMantineColorScheme();

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
          <Box
            w="100%"
            h="100%"
            right={10}
            top={0}
            style={{
              opacity: 0.3,
              position: 'fixed',
              backgroundImage: 'url("/bg.png")',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'top right',
            }}
          />
          {children}
        </AppShell.Main>
      </FadeTransition>
    </AppShell>
  );
};

export default BaseShell;
