import { ActionIcon, Flex } from '@mantine/core';
import { IconArchive, IconCheckbox, IconEdit } from '@tabler/icons-react';

const WordActions = ({}: { word: IWord }) => {
  return (
    <Flex direction="row" align="center" justify="start" mt="md" gap="md">
      <ActionIcon size="md" radius="md" variant="light" color="green">
        <IconArchive size={18} />
      </ActionIcon>

      <ActionIcon size="md" radius="md" variant="light" color="orange">
        <IconCheckbox size={18} />
      </ActionIcon>

      <ActionIcon size="md" radius="md" variant="light" color="grape">
        <IconEdit size={18} />
      </ActionIcon>
    </Flex>
  );
};

export default WordActions;
