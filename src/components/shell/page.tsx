import { useThemeStyle } from '@/hooks';
import { Envs } from '@/utils';
import { IconArrowUp } from '@tabler/icons-react';
import { useDocumentTitle, useWindowScroll } from '@mantine/hooks';
import {
  ActionIcon,
  Affix,
  Box,
  Container,
  LoadingOverlay,
  MantineTransition,
  Transition,
} from '@mantine/core';

export interface PageProps {
  children?: React.ReactNode;
  title: string;
  loading?: boolean;
  transition?: MantineTransition;
  unstyled?: boolean;
}

const Page = ({
  title,
  loading,
  children,
  transition = 'fade',
  unstyled = false,
}: PageProps) => {
  const { isDesktop } = useThemeStyle();

  useDocumentTitle(`${Envs.app.title} - ${title}`);
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <Container unstyled={!isDesktop || unstyled}>
      <Transition
        transition={transition}
        mounted={!loading}
        timingFunction="all"
      >
        {(styles) => (
          <Box
            px={isDesktop ? 'xs' : 0}
            mb={isDesktop ? 'sm' : 0}
            mx="xs"
            style={styles}
          >
            {children}

            {isDesktop && (
              <Affix position={{ bottom: 20, left: 20 }}>
                <Transition transition="slide-up" mounted={scroll.y > 0}>
                  {(transitionStyles) => (
                    <ActionIcon
                      style={transitionStyles}
                      onClick={() => scrollTo({ y: 0 })}
                      size="lg"
                      color="indigo"
                    >
                      <IconArrowUp size={22} />
                    </ActionIcon>
                  )}
                </Transition>
              </Affix>
            )}
          </Box>
        )}
      </Transition>

      {loading && <LoadingOverlay />}
    </Container>
  );
};

export default Page;
