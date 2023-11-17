import { openModal } from '@mantine/modals';
import { IconPlus } from '@tabler/icons-react';
import { ConversationItem, ConversationItemForm } from '.';
import { useEffect, useMemo, useState } from 'react';
import { ImageStates } from '..';
import { useApp } from '@/hooks';
import {
  ActionIcon,
  Alert,
  Box,
  Card,
  Center,
  Flex,
  ScrollArea,
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
      <Alert radius="lg" mb="xs" color="gray">
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
            <ActionIcon
              size="xl"
              onClick={() => {
                openModal({
                  title: 'New Conversation Item',
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
          )}
        </Flex>
      </Alert>

      <Center>
        <SegmentedControl
          disabled={compact}
          radius="lg"
          w="100%"
          size="xs"
          value={activeCharacter}
          onChange={setActiveCharacter}
          data={conversation.characters}
          styles={{
            control: {
              textTransform: 'capitalize',
            },
          }}
        />
      </Center>

      {!compact && hasItems && (
        <Flex mt="md">
          <ScrollArea mah={300} w="100%" type="always" scrollbarSize={8}>
            <Flex direction="column" gap={6} pos="relative">
              {renderItems()}
            </Flex>
          </ScrollArea>
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
