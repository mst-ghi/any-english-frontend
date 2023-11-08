import { useState } from 'react';
import { ActionIcon, Button, Card, Flex, Image, Title } from '@mantine/core';
import { Logo, WordCard, WordForm } from '@/components';
import { openModal } from '@mantine/modals';
import useRequest from '@/hooks/useRequest';
import { IconRefresh, IconX } from '@tabler/icons-react';
import { useFetchLastWord } from '@/hooks';
import { useQueryClient } from '@tanstack/react-query';

const WordWizard = () => {
  const queryClient = useQueryClient();
  const { callRequest } = useRequest();
  const { data: lastWord, refetch: refetchLastWord } = useFetchLastWord();
  const [word, setWord] = useState<IWord | undefined>();

  const onCLear = () => {
    setWord(undefined);
    queryClient.invalidateQueries({ queryKey: ['last-word'], stale: true });
  };

  const refetchWord = async () => {
    if (word) {
      const response = await callRequest<{ word: IWord }>(
        'GET',
        `/api/v1/words/${word.id}`,
      );
      setWord(response.word);
    }
  };

  return (
    <Flex direction="column" gap="xl">
      <Flex direction="column" align="center">
        <Logo maw={420} />
      </Flex>

      <Card w="100%" p="lg">
        {!word && (
          <Card withBorder>
            <WordForm onSubmit={setWord} />
          </Card>
        )}

        {word && (
          <Flex direction="column" gap="sm">
            <Flex justify="space-between" align="center" direction="row">
              <Button
                leftSection={<IconX />}
                variant="subtle"
                size="xs"
                color="red"
                onClick={onCLear}
              >
                CLear and New Word
              </Button>

              <Button
                leftSection={<IconRefresh />}
                variant="subtle"
                size="xs"
                color="green"
                onClick={refetchWord}
              >
                refresh
              </Button>
            </Flex>

            <WordCard
              word={word}
              onEditClick={() => {
                openModal({
                  title: 'Update Word',
                  children: <WordForm initWord={word} onSubmit={refetchWord} />,
                  closeOnClickOutside: false,
                  closeOnEscape: false,
                  size: 'lg',
                });
              }}
            />
          </Flex>
        )}
      </Card>

      {lastWord && (
        <Card p="lg">
          <Card.Section px="md" py="sm">
            <Flex direction="row" align="center" justify="space-between">
              <Title c="gray.7" order={3}>
                The last saved word
              </Title>

              <ActionIcon color="dark.3" onClick={() => refetchLastWord()}>
                <IconRefresh size={20} />
              </ActionIcon>
            </Flex>
          </Card.Section>

          <WordCard word={lastWord} />
        </Card>
      )}
    </Flex>
  );
};

export default WordWizard;
