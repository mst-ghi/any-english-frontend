import {
  AppShell,
  Box,
  ScrollArea,
  useMantineColorScheme,
} from '@mantine/core';
import { useApp } from '@/hooks';
import { PageHeader } from '.';
import { FadeTransition, FullLoader } from '..';

const BaseShell = ({ children }: { children?: React.ReactNode }) => {
  const { isLoading } = useApp();
  const { colorScheme } = useMantineColorScheme();

  return (
    <AppShell>
      {isLoading && <FullLoader />}

      <FadeTransition mounted={!isLoading}>
        <AppShell.Header>
          <PageHeader />
        </AppShell.Header>

        <AppShell.Main
          bg={colorScheme === 'light' ? 'gray.1' : 'dark.5'}
          pos="relative"
          pt={60}
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
          <ScrollArea type="always" h={`calc(100vh - 50px)`}>
            <Box py="md">{children}</Box>
          </ScrollArea>
        </AppShell.Main>
      </FadeTransition>
    </AppShell>
  );
};

export default BaseShell;
