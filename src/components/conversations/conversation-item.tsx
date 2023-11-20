import { useApp, useThemeStyle } from '@/hooks';
import { useSpeechSynthesis } from 'react-speech-kit';
import { ActionIcon, Button, Card, Divider, Flex, Text } from '@mantine/core';
import { IconEdit, IconTrash, IconVolume } from '@tabler/icons-react';
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
  const { theme } = useThemeStyle();
  const { speak, speaking } = useSpeechSynthesis();

  const onDeleteItem = async () => {
    await callRequest('DELETE', `/api/v1/conversations/${item.id}/item`);
    if (onReload) {
      onReload();
    }
  };

  return (
    <Flex
      w="100%"
      direction="row"
      align="center"
      dir={isActive ? 'rtl' : 'ltr'}
      pr="md"
    >
      <Card
        withBorder
        p="xs"
        pb={6}
        radius="lg"
        dir={isActive ? 'rtl' : 'ltr'}
        miw={300}
        style={{
          width: 'fit-content',
          blockSize: 'fit-content',
          border: `1px dashed ${theme.colors.gray[4]}`,
        }}
      >
        <Card.Section bg="gray.0" p="xs" pb={4}>
          <Flex direction="row" align="center" justify="space-between">
            <Button
              leftSection={<IconVolume size={18} />}
              disabled={speaking}
              variant="light"
              size="xs"
              radius="lg"
              h={22}
              styles={{
                section: {
                  marginRight: 4,
                  marginLeft: 4,
                },
              }}
              onClick={() => speak({ text: item.phrase, rate: 0.8 })}
            >
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
                  color="grape"
                  onClick={() => {
                    openModal({
                      title: 'Update Conversation Item',
                      size: 'lg',
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
        </Card.Section>

        <Flex direction="column" px={4} mt={4} style={{ flex: 1 }}>
          <Text size="sm" fw={600} dir="ltr">
            {item.phrase}
          </Text>
          <Text size="xs" dir="rtl" mt={2}>
            {item.meaning}
          </Text>
        </Flex>
      </Card>

      <Divider w="100%" variant="dashed" />
    </Flex>
  );
};

export default ConversationItem;
