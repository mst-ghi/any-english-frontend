import { AppShell, Box, ScrollArea } from '@mantine/core';
import { useApp, useThemeStyle } from '@/hooks';
import { PageHeader } from '.';
import { FadeTransition, FullLoader } from '..';

const BaseShell = ({ children }: { children?: React.ReactNode }) => {
  const { isLoading } = useApp();
  const { isLightTheme } = useThemeStyle();

  return (
    <AppShell>
      {isLoading && <FullLoader />}

      <FadeTransition mounted={!isLoading}>
        <AppShell.Header>
          <PageHeader />
        </AppShell.Header>

        <AppShell.Main
          bg={isLightTheme ? 'gray.1' : 'dark.5'}
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

          {!isLightTheme &&
            Array.from({ length: 30 }).map((e, idx) => (
              <div key={`firefly-${idx}`} className="firefly" />
            ))}

          <ScrollArea type="always" h={`calc(100vh - 50px)`}>
            <Box py="md">{children}</Box>
          </ScrollArea>
        </AppShell.Main>
      </FadeTransition>
    </AppShell>
  );
};

export default BaseShell;
