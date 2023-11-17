import { useApp } from '@/hooks';
import { useSpeechSynthesis } from 'react-speech-kit';
import { ActionIcon, Box, Button, Card, Flex, Text } from '@mantine/core';
import { IconEdit, IconTrash, IconVolume } from '@tabler/icons-react';
import { Fragment } from 'react';
import { openConfirmModal, openModal } from '@mantine/modals';
import { ConversationItemForm } from '.';
import useRequest from '@/hooks/useRequest';

const ConversationItem = ({
  characters,
  item,
  isActive = false,
  onReload,
}: {
  characters: string[];
  item: IConversationItem;
  isActive?: boolean;
  onReload?: () => void;
}) => {
  const { isAdmin } = useApp();
  const { callRequest } = useRequest();
  const { speak, speaking } = useSpeechSynthesis();

  const onDeleteItem = async () => {
    await callRequest('DELETE', `/api/v1/conversations/${item.id}/item`);
    if (onReload) {
      onReload();
    }
  };

  return (
    <Card
      withBorder
      p="xs"
      pb={6}
      radius="xl"
      dir={isActive ? 'rtl' : 'ltr'}
      miw={264}
      style={{
        width: 'fit-content',
        blockSize: 'fit-content',
        alignSelf: isActive ? 'flex-end' : 'flex-start',
      }}
    >
      <Flex direction="row">
        <Box
          bg={isActive ? 'green.3' : 'blue.3'}
          pr={2}
          pt={5}
          mb={2}
          style={{ borderRadius: 10, opacity: 0.8 }}
        >
          <Text
            c="white"
            fw={700}
            size="xs"
            style={{
              writingMode: 'vertical-rl',
              textOrientation: 'upright',
            }}
          >
            {item.character.substring(0, 3).toUpperCase()}
          </Text>
        </Box>

        <Flex direction="column" px="sm" style={{ flex: 1 }}>
          <Flex direction="row" align="center" justify="space-between" mb={4}>
            <Button
              color="green"
              disabled={speaking}
              variant="light"
              size="xs"
              h={22}
              onClick={() => speak({ text: item.phrase, rate: 0.8 })}
              dir="ltr"
            >
              <IconVolume size={18} />
              <Text size="xs" fw={500} mt={3} ml={2}>
                {item.character}
              </Text>
            </Button>

            {isAdmin && (
              <Flex direction="row" align="center" gap="xs">
                <ActionIcon
                  variant="transparent"
                  radius="md"
                  size="sm"
                  onClick={() => {
                    openModal({
                      title: 'Update Conversation Item',
                      children: (
                        <ConversationItemForm
                          conversationId={item.conversation_id}
                          characters={characters}
                          initItem={item}
                          onSubmit={onReload}
                        />
                      ),
                      closeOnClickOutside: false,
                      closeOnEscape: false,
                    });
                  }}
                >
                  <IconEdit size={18} />
                </ActionIcon>

                <ActionIcon
                  variant="transparent"
                  radius="md"
                  size="sm"
                  color="red"
                  onClick={() => {
                    openConfirmModal({
                      title: (
                        <Text size="xl" fw={600}>
                          Delete Conversation Item
                        </Text>
                      ),
                      children: (
                        <Text>
                          Are you sure to delete this conversation item?
                        </Text>
                      ),
                      confirmProps: {
                        color: 'red',
                      },
                      onConfirm: onDeleteItem,
                    });
                  }}
                >
                  <IconTrash size={18} />
                </ActionIcon>
              </Flex>
            )}
          </Flex>

          <Text size="sm" fw={600} dir="ltr">
            {item.phrase}
          </Text>
          <Text size="xs" dir="rtl" mt={2}>
            {item.meaning}
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
};

export default ConversationItem;
