import { openModal } from '@mantine/modals';
import { IconEdit, IconPlus } from '@tabler/icons-react';
import { ConversationForm, ConversationItem, ConversationItemForm } from '.';
import { useEffect, useMemo, useState } from 'react';
import { ImageStates } from '..';
import { useApp, useThemeStyle } from '@/hooks';
import {
  ActionIcon,
  Alert,
  Box,
  Card,
  Flex,
  SegmentedControl,
  Text,
} from '@mantine/core';

type ConversationPreviewProps = {
  compact?: boolean;
  conversation: IConversation;
  onReload?: () => void;
};

const ConversationPreview = ({
  compact = false,
  conversation,
  onReload,
}: ConversationPreviewProps) => {
  const { isAdmin } = useApp();
  const { theme } = useThemeStyle();
  const [activeCharacter, setActiveCharacter] = useState<string>();

  const hasItems = useMemo(() => {
    return Boolean(conversation.items && conversation.items[0]);
  }, [conversation]);

  const renderItems = () => {
    return conversation.items?.map((item) => {
      return (
        <ConversationItem
          key={`preview-item-${item.id}`}
          characters={conversation.characters}
          item={item}
          isActive={item.character === activeCharacter}
          onReload={onReload}
        />
      );
    });
  };

  useEffect(() => {
    setActiveCharacter(conversation.characters[0]);
  }, [conversation]);

  return (
    <Card withBorder radius="lg" w="100%">
      <Alert radius="lg" mb="xs" color="gray" pb={4}>
        <Flex direction="row" align="center" gap="lg" justify="space-between">
          <Box style={{ flex: 1 }}>
            <Text size="lg" fw={500}>
              {conversation.title}
            </Text>

            <Text size="sm" fw={400} dir="rtl">
              {conversation.meaning}
            </Text>
          </Box>

          {isAdmin && !compact && (
            <Flex direction="row" align="center" gap="md">
              <ActionIcon
                size="xl"
                color="grape"
                onClick={() => {
                  openModal({
                    title: 'Update Conversation',
                    size: 'lg',
                    children: (
                      <ConversationForm
                        initConversation={conversation}
                        onSubmit={onReload}
                      />
                    ),
                  });
                }}
              >
                <IconEdit />
              </ActionIcon>

              <ActionIcon
                size="xl"
                onClick={() => {
                  openModal({
                    title: 'New Conversation Item',
                    size: 'lg',
                    children: (
                      <ConversationItemForm
                        conversationId={conversation.id}
                        characters={conversation.characters}
                        onSubmit={onReload}
                      />
                    ),
                  });
                }}
              >
                <IconPlus />
              </ActionIcon>
            </Flex>
          )}
        </Flex>

        <SegmentedControl
          mt="sm"
          disabled={compact}
          radius="lg"
          w="100%"
          size="xs"
          value={activeCharacter}
          onChange={setActiveCharacter}
          data={conversation.characters}
          styles={{
            root: {
              backgroundColor: theme.colors.gray[0],
            },
            control: {
              textTransform: 'capitalize',
            },
          }}
        />
      </Alert>

      {!compact && hasItems && (
        <Flex direction="column" gap={6} mt="lg" mb="md">
          {renderItems()}
        </Flex>
      )}

      <ImageStates
        enable={!hasItems && !compact}
        name="noMessages"
        height={300}
        width={300}
      />
    </Card>
  );
};

export default ConversationPreview;
