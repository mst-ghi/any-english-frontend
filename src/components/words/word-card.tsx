import { Fragment, useEffect, useState } from 'react';
import {
  PhraseForm,
  PhrasePreview,
  WordForm,
  WordLightnerAction,
  WordPreview,
} from '..';

import { useFetchData, useApp, useThemeStyle } from '@/hooks';
import { openModal } from '@mantine/modals';
import { useQueryClient } from '@tanstack/react-query';

import {
  IconChevronDown,
  IconChevronUp,
  IconEdit,
  IconPlus,
} from '@tabler/icons-react';
import {
  ActionIcon,
  Box,
  Card,
  CardProps,
  Flex,
  SegmentedControl,
  Text,
} from '@mantine/core';

type WordCardProps = CardProps & {
  word: IWord;
  compact?: boolean;
  onEditClick?: () => void;
};

const WordCard = ({
  word,
  compact = false,
  onEditClick,
  ...props
}: WordCardProps) => {
  const queryClient = useQueryClient();
  const { isAdmin } = useApp();
  const { isDesktop } = useThemeStyle();
  const { fetchWord } = useFetchData();

  const [wordData, setWordData] = useState<IWord>(word);
  const [display, setDisplay] = useState<TTextDisplay>('both');
  const [isPhraseVisible, setIsPhraseVisible] = useState(false);

  useEffect(() => {
    setWordData(word);
  }, [word]);

  return (
    <Card withBorder pos="relative" {...props}>
      {!compact && (
        <Text
          fz={isDesktop ? 64 : 50}
          fw={600}
          pos="absolute"
          left={10}
          top={isDesktop ? -10 : -5}
          style={{ zIndex: 0, opacity: 0.03 }}
          className="first-letter-uppercase"
        >
          {wordData.word}
        </Text>
      )}

      <Box style={{ zIndex: 1 }}>
        {!compact && (
          <Card.Section px="sm" pb="sm">
            <Flex direction="row" align="center" justify="flex-end">
              <SegmentedControl
                radius="md"
                size="xs"
                value={display}
                onChange={setDisplay}
                data={[
                  { label: 'Both', value: 'both' },
                  { label: 'Eng', value: 'en' },
                  { label: 'Per', value: 'fa' },
                ]}
              />
            </Flex>
          </Card.Section>
        )}

        <WordPreview word={wordData} display={display} />

        <Flex direction="row" align="center" justify="start" gap="sm" mt="xs">
          {!compact && wordData.phrases && wordData.phrases[0] && (
            <ActionIcon
              variant="light"
              radius="md"
              color="dark"
              size="md"
              onClick={() => setIsPhraseVisible(!isPhraseVisible)}
            >
              {isPhraseVisible ? (
                <IconChevronUp size={18} />
              ) : (
                <IconChevronDown size={18} />
              )}
            </ActionIcon>
          )}

          {isAdmin && (
            <Fragment>
              {!compact && (
                <ActionIcon
                  size="md"
                  radius="md"
                  h={28}
                  onClick={() => {
                    openModal({
                      title: 'New Phrase',
                      children: (
                        <PhraseForm
                          word={wordData}
                          onSubmitDone={async () => {
                            setWordData(await fetchWord(wordData.id));
                            setIsPhraseVisible(true);
                          }}
                        />
                      ),
                      closeOnClickOutside: false,
                      closeOnEscape: false,
                    });
                  }}
                >
                  <IconPlus size={18} />
                </ActionIcon>
              )}

              <ActionIcon
                size="md"
                radius="md"
                color="grape"
                onClick={() => {
                  if (onEditClick) {
                    onEditClick();
                  } else {
                    openModal({
                      children: (
                        <WordForm
                          initWord={wordData}
                          onSubmit={() => {
                            queryClient.invalidateQueries({
                              queryKey: ['words'],
                              stale: true,
                            });
                          }}
                        />
                      ),
                      closeOnClickOutside: false,
                      closeOnEscape: false,
                      size: 'lg',
                    });
                  }
                }}
              >
                <IconEdit size={18} />
              </ActionIcon>
            </Fragment>
          )}

          <WordLightnerAction
            wordId={wordData.id}
            lightners={wordData.lightners}
            onReload={async () => {
              setWordData(await fetchWord(wordData.id));
            }}
          />
        </Flex>

        {!compact && wordData.phrases && (
          <Flex
            direction="column"
            mt="sm"
            gap={6}
            style={{
              display: isPhraseVisible ? 'flex' : 'none',
              animation: 'fade-in-show 0.1s',
            }}
          >
            {wordData.phrases.map((phrase) => {
              return (
                <PhrasePreview
                  key={phrase.id}
                  phrase={phrase}
                  display={display}
                />
              );
            })}
          </Flex>
        )}
      </Box>
    </Card>
  );
};

export default WordCard;
