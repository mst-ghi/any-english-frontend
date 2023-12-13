import { useApp, useThemeStyle } from '@/hooks';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';

import {
  Burger,
  Button,
  Card,
  Divider,
  Drawer,
  Flex,
  Image,
  Text,
} from '@mantine/core';

import { UserAvatarHeader } from '.';
import { ColorSchemeToggle, Logo } from '..';
import { IconPlus } from '@tabler/icons-react';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import CreationActionHeader from './creation-action-header';
import SearchActionHeader from './search-action-header';

const links: { label: string; href: string }[] = [
  { label: 'Words', href: '/words' },
  { label: 'Phrases', href: '/phrases' },
  { label: 'Conversations', href: '/conversations' },
];

const PageHeader = () => {
  const pathname = usePathname();
  const [opened, { open, close }] = useDisclosure();
  const { isDesktop, isMobile } = useThemeStyle();
  const { isLoggedIn, isAdmin } = useApp();

  useEffect(() => {
    close();
  }, [pathname]);

  return (
    <Card h={60} py="xs" radius={0}>
      <Flex direction="row" align="center" justify="space-between">
        {isDesktop && (
          <Flex direction="row" align="center" gap="xl">
            <Link href="/">
              <Logo height={40} />
            </Link>

            <Flex direction="row" align="center" gap="xl">
              {links.map((el, idx) => {
                return (
                  <Link href={el.href} key={`${el.label}-${idx}`}>
                    <Text
                      fw={500}
                      c={pathname === el.href ? 'blue' : undefined}
                    >
                      {el.label}
                    </Text>
                  </Link>
                );
              })}
            </Flex>
          </Flex>
        )}

        {isMobile && (
          <Burger
            opened={opened}
            onClick={open}
            aria-label="Toggle navigation"
          />
        )}

        <Flex direction="row" align="center" gap="md">
          <ColorSchemeToggle />

          <SearchActionHeader />

          <CreationActionHeader />

          <UserAvatarHeader />

          {!isLoggedIn && (
            <Button variant="light" component={Link} href="/auth/login">
              Login / Register
            </Button>
          )}
        </Flex>
      </Flex>

      <Drawer
        withCloseButton={false}
        size="72%"
        opened={opened}
        onClose={close}
        pos="relative"
        title={<Logo height={36} />}
      >
        <Divider mb="lg" />

        <Flex direction="column" gap="md" style={{ flex: 1 }}>
          {links.map((el, idx) => {
            return (
              <Link href={el.href} key={`${el.label}-${idx}-drawer`}>
                <Text
                  size="xl"
                  fw={500}
                  c={pathname === el.href ? 'blue' : undefined}
                >
                  {el.label}
                </Text>
              </Link>
            );
          })}
        </Flex>

        {isAdmin && (
          <Button
            leftSection={<IconPlus size={26} />}
            pos="absolute"
            bottom={20}
            size="lg"
            w="90%"
            component={Link}
            href="/new-word"
          >
            New Word
          </Button>
        )}
      </Drawer>
    </Card>
  );
};

export default PageHeader;
