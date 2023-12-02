import { ActionIcon, Badge, Box, Card, Center, Text } from '@mantine/core';
import { SpeakingActionIcon } from '..';
import { IconArrowDown, IconArrowUp } from '@tabler/icons-react';
import { useLightnerActions } from '@/hooks';

const LightnerCard = ({
  lightner,
  idx,
}: {
  lightner: ILightner;
  idx: number;
}) => {
  const { isProcessing, upsertLightnerWord, upsertLightnerPhrase } =
    useLightnerActions();

  const isWord = Boolean(lightner.word_id);

  return (
    <Center
      mih={360}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
      }}
      pos="relative"
    >
      <Text
        pos="absolute"
        w="100%"
        top={20}
        fz={26}
        c="gray.5"
        fw={700}
        style={{ textAlign: 'center' }}
      >
        {idx}
      </Text>

      <Card h={130} style={{ textAlign: 'center' }}>
        <Text size="xl" fw={600}>
          {lightner.word?.word || lightner.phrase?.phrase}
        </Text>

        <Text dir="rtl">
          {lightner.word?.meaning || lightner.phrase?.meaning}
        </Text>
      </Card>

      <Center
        mt={42}
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 16,
          width: '100%',
        }}
      >
        <ActionIcon
          variant="light"
          color="red"
          size="xl"
          radius="xl"
          disabled={lightner.level > 3 || isProcessing}
          onClick={() =>
            isWord
              ? upsertLightnerWord(lightner.word_id, lightner.level + 1)
              : upsertLightnerPhrase(lightner.phrase_id, lightner.level + 1)
          }
        >
          <IconArrowDown />
        </ActionIcon>

        <SpeakingActionIcon
          value={lightner.word?.word || lightner.phrase?.phrase}
          size="xl"
          iconSize={40}
        />

        <ActionIcon
          variant="light"
          color="blue"
          size="xl"
          radius="xl"
          disabled={isProcessing}
          onClick={() =>
            isWord
              ? upsertLightnerWord(lightner.word_id, lightner.level - 1)
              : upsertLightnerPhrase(lightner.phrase_id, lightner.level - 1)
          }
        >
          <IconArrowUp />
        </ActionIcon>
      </Center>
    </Center>
  );
};

export default LightnerCard;
