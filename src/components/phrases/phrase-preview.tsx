import {
  ActionIcon,
  Box,
  Card,
  Flex,
  MantineColor,
  Menu,
  StyleProp,
  Text,
} from '@mantine/core';
import { PhraseForm, TextBlur } from '..';
import { IconDots, IconEdit, IconTrash, IconVolume } from '@tabler/icons-react';
import { openConfirmModal, openModal } from '@mantine/modals';
import useRequest from '@/hooks/useRequest';
import { useQueryClient } from '@tanstack/react-query';
import { useApp, useThemeStyle } from '@/hooks';
import { useSpeechSynthesis } from 'react-speech-kit';

const PhrasePreview = ({
  phrase,
  display = 'both',
  bg = 'gray.0',
}: {
  phrase: IPhrase;
  display?: TTextDisplay;
  bg?: StyleProp<MantineColor>;
}) => {
  const queryClient = useQueryClient();
  const { callRequest } = useRequest();
  const { isAdmin } = useApp();
  const { isLightTheme, isDesktop } = useThemeStyle();
  const { speak, speaking } = useSpeechSynthesis();

  const onDeletePhrase = async () => {
    await callRequest('DELETE', `/api/v1/phrases/${phrase.id}`);
    queryClient.invalidateQueries({ queryKey: ['words'], stale: true });
    queryClient.invalidateQueries({ queryKey: ['phrases'], stale: true });
  };

  return (
    <Card>
      <Card.Section>
        <Box
          px="md"
          py="xs"
          style={{
            borderRadius: 'var(--mantine-radius-md)',
            border: `1px solid ${
              isLightTheme
                ? 'var(--mantine-color-gray-3)'
                : 'var(--mantine-color-dark-4)'
            }`,
          }}
        >
          <Flex direction="row" align="center" justify="space-between" mb={4}>
            <Flex direction="row" align="start" gap={4}>
              <ActionIcon
                disabled={speaking}
                variant="transparent"
                radius="md"
                size="sm"
                onClick={() => speak({ text: phrase.phrase, rate: 0.8 })}
              >
                <IconVolume size={18} />
              </ActionIcon>

              <TextBlur
                size="sm"
                fw={600}
                value={phrase.phrase}
                blur={display === 'fa'}
              />
            </Flex>

            {isAdmin && (
              <Menu position="bottom-end" width={120} withinPortal withArrow>
                <Menu.Target>
                  <IconDots
                    color="gray"
                    size={18}
                    style={{ cursor: 'pointer' }}
                  />
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    leftSection={<IconEdit size={18} />}
                    onClick={() => {
                      openModal({
                        title: 'Update Phrase',
                        children: <PhraseForm initPhrase={phrase} />,
                        closeOnClickOutside: false,
                        closeOnEscape: false,
                      });
                    }}
                  >
                    Edit
                  </Menu.Item>

                  <Menu.Divider mx={4} />

                  <Menu.Item
                    leftSection={<IconTrash size={18} />}
                    color="red"
                    onClick={() => {
                      openConfirmModal({
                        title: (
                          <Text size="xl" fw={600}>
                            Delete Phrase
                          </Text>
                        ),
                        children: (
                          <Text>Are you sure to delete this phrase?</Text>
                        ),
                        confirmProps: {
                          color: 'red',
                        },
                        onConfirm: onDeletePhrase,
                      });
                    }}
                  >
                    Delete
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            )}
          </Flex>
          <TextBlur
            dir="rtl"
            size="sm"
            value={phrase.meaning}
            blur={display === 'en'}
          />
        </Box>
      </Card.Section>
    </Card>
  );
};

export default PhrasePreview;
