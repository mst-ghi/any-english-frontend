import { useState } from 'react';
import { PhraseForm, PhrasePreview, WordForm, WordPreview } from '..';

import { useApp, useThemeStyle } from '@/hooks';
import { openModal } from '@mantine/modals';
import { useQueryClient } from '@tanstack/react-query';

import {
  IconArrowBadgeDown,
  IconArrowBadgeUp,
  IconEdit,
  IconPlus,
} from '@tabler/icons-react';
import {
  ActionIcon,
  Box,
  Button,
  Card,
  CardProps,
  Flex,
  SegmentedControl,
  Text,
} from '@mantine/core';

type WordCardProps = CardProps & {
  word: IWord;
  onEditClick?: () => void;
  onReload?: () => void;
};

const WordCard = ({ word, onEditClick, onReload, ...props }: WordCardProps) => {
  const queryClient = useQueryClient();
  const { isAdmin } = useApp();
  const { isDesktop } = useThemeStyle();

  const [display, setDisplay] = useState<TTextDisplay>('both');
  const [isPhraseVisible, setIsPhraseVisible] = useState(false);

  return (
    <Card withBorder pos="relative" {...props}>
      <Text
        fz={isDesktop ? 64 : 50}
        fw={600}
        pos="absolute"
        left={10}
        top={isDesktop ? -10 : -5}
        style={{ zIndex: 0, opacity: 0.03 }}
        className="first-letter-uppercase"
      >
        {word.word}
      </Text>

      <Box style={{ zIndex: 1 }}>
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

        <WordPreview word={word} display={display} />

        <Flex direction="row" align="center" justify="space-between" my="sm">
          {isAdmin && (
            <Button
              leftSection={<IconPlus size={18} />}
              size="xs"
              variant="light"
              h={28}
              onClick={() => {
                openModal({
                  title: 'New Phrase',
                  children: (
                    <PhraseForm
                      word={word}
                      onSubmitDone={() => {
                        if (onReload) {
                          onReload();
                        }
                        setIsPhraseVisible(true);
                      }}
                    />
                  ),
                  closeOnClickOutside: false,
                  closeOnEscape: false,
                });
              }}
            >
              New Phrase
            </Button>
          )}

          <Flex direction="row" align="center" justify="start" gap="md">
            {isAdmin && (
              <ActionIcon
                size="md"
                radius="md"
                onClick={() => {
                  if (onEditClick) {
                    onEditClick();
                  } else {
                    openModal({
                      children: (
                        <WordForm
                          initWord={word}
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
            )}

            {word.phrases && word.phrases[0] && (
              <ActionIcon
                variant="light"
                radius="md"
                size="md"
                onClick={() => setIsPhraseVisible(!isPhraseVisible)}
              >
                {isPhraseVisible ? (
                  <IconArrowBadgeUp size={18} />
                ) : (
                  <IconArrowBadgeDown size={18} />
                )}
              </ActionIcon>
            )}
          </Flex>
        </Flex>

        {word.phrases && (
          <Flex
            direction="column"
            mt="sm"
            gap={4}
            style={{
              display: isPhraseVisible ? 'flex' : 'none',
              animation: 'fade-in-show 0.1s',
            }}
          >
            {word.phrases.map((phrase) => {
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
