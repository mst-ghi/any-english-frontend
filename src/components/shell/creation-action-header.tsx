import { useApp } from '@/hooks';
import { ActionIcon, Menu } from '@mantine/core';
import { IconCodePlus, IconPlus } from '@tabler/icons-react';
import Link from 'next/link';
import { useMemo } from 'react';

const CreationActionHeader = () => {
  const { isLoading, isAdmin, isOperator } = useApp();

  const isAddBtnVisible = useMemo(() => {
    return isAdmin || isOperator;
  }, [isLoading, isAdmin, isOperator]);

  if (!isAddBtnVisible) {
    return null;
  }

  return (
    <Menu withArrow withinPortal position="bottom-end">
      <Menu.Target>
        <ActionIcon size={38} radius="md">
          <IconPlus size={28} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          leftSection={<IconCodePlus />}
          component={Link}
          href="/new-word"
        >
          New Word
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item
          leftSection={<IconCodePlus />}
          component={Link}
          href="/new-conversation"
        >
          New Conversation
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default CreationActionHeader;
