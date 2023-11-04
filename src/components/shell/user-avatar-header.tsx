import { Avatar, Flex, Menu, Text } from '@mantine/core';
import { openConfirmModal } from '@mantine/modals';
import { IconLogout, IconUserPin } from '@tabler/icons-react';
import { useAuth } from '../auth';
import Link from 'next/link';

const UserAvatarHeader = () => {
  const { isLoggedIn, user, logout } = useAuth();

  if (!isLoggedIn || !user) {
    return null;
  }

  return (
    <Menu position="bottom-end" withArrow withinPortal width={200}>
      <Menu.Target>
        <Avatar radius="md" color="blue" />
      </Menu.Target>

      <Menu.Dropdown>
        <Flex direction="row" px="xs" py={4} align="center" gap={6}>
          <Avatar size="sm" alt={user.fullname} radius="md" color="blue" />
          <Text size="sm" fw={600}>
            {user.fullname}
          </Text>
        </Flex>

        <Menu.Divider mx="xs" />

        <Menu.Item
          leftSection={<IconUserPin />}
          component={Link}
          href="/profile"
        >
          My Profile
        </Menu.Item>

        <Menu.Item
          color="red"
          leftSection={<IconLogout />}
          onClick={() => {
            openConfirmModal({
              title: (
                <Text size="xl" fw={600}>
                  Logout
                </Text>
              ),
              children: <Text>Are you sure to logout?</Text>,
              confirmProps: {
                color: 'red',
              },
              onConfirm: logout,
            });
          }}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default UserAvatarHeader;
