import { Button, Card, Center, Flex, Text } from '@mantine/core';
import { SpeakingActionIcon } from '..';
import { IconArrowDown, IconArrowUp } from '@tabler/icons-react';
import { useLightnerActions } from '@/hooks';

const LightnerCard = ({ lightner }: { lightner: ILightner }) => {
  const { isProcessing, upsertLightnerWord, upsertLightnerPhrase } =
    useLightnerActions();

  const isWord = Boolean(lightner.word_id);

  return (
    <Card>
      <Center
        mih={360}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
        }}
      >
        <Flex direction="row" align="center" gap="sm" style={{ flex: 1 }}>
          <SpeakingActionIcon
            value={lightner.word?.word || lightner.phrase?.phrase}
            size={70}
            iconSize={50}
          />
          <Flex direction="column" gap="xs">
            <Text fz={32} fw={600}>
              {lightner.word?.word || lightner.phrase?.phrase}
            </Text>

            <Text dir="rtl">
              {lightner.word?.meaning || lightner.phrase?.meaning}
            </Text>
          </Flex>
        </Flex>

        <Flex
          direction="row"
          align="center"
          justify="space-between"
          gap="md"
          mt={42}
          w="100%"
          px="md"
        >
          <Button
            leftSection={<IconArrowDown />}
            variant="light"
            color="red"
            miw={174}
            mih={64}
            disabled={lightner.level > 3 || isProcessing}
            onClick={() =>
              isWord
                ? upsertLightnerWord(lightner.word_id, lightner.level + 1)
                : upsertLightnerPhrase(lightner.phrase_id, lightner.level + 1)
            }
          >
            I do not know
          </Button>

          <Button
            rightSection={<IconArrowUp />}
            variant="light"
            color="blue"
            miw={174}
            mih={64}
            disabled={isProcessing}
            onClick={() =>
              isWord
                ? upsertLightnerWord(lightner.word_id, lightner.level - 1)
                : upsertLightnerPhrase(lightner.phrase_id, lightner.level - 1)
            }
          >
            I know
          </Button>
        </Flex>
      </Center>
    </Card>
  );
};

export default LightnerCard;
