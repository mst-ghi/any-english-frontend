import { useHelpy } from '@/hooks';
import { ActionIcon } from '@mantine/core';
import { IconEar, IconEarOff } from '@tabler/icons-react';

const HelpyActionHeader = () => {
  const { active, helpyOn, helpyOff } = useHelpy();

  return (
    <ActionIcon
      radius="md"
      w={38}
      h={38}
      color={active ? 'green' : 'dark'}
      onClick={() => (active ? helpyOff() : helpyOn())}
    >
      {active ? <IconEar /> : <IconEarOff />}
    </ActionIcon>
  );
};

export default HelpyActionHeader;
