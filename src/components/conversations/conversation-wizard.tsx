import {
  Box,
  Card,
  Center,
  Flex,
  Loader,
  Stepper,
  Tabs,
  Title,
} from '@mantine/core';
import { ConversationForm, ConversationPreview, Logo } from '..';
import { useEffect, useState } from 'react';
import { useFetchData } from '@/hooks';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const ConversationWizard = ({
  initConversationId,
}: {
  initConversationId?: string;
}) => {
  const Router = useRouter();
  const { fetchConversation } = useFetchData();

  const [tab, setTab] = useState<string | null>();
  const [conversation, setConversation] = useState<IConversation>();

  const { data, isFetching, refetch } = useQuery<IConversation>({
    queryKey: ['conversation', initConversationId],
    queryFn: async () => await fetchConversation(initConversationId),
    enabled: !!initConversationId && conversation?.id !== initConversationId,
  });

  useEffect(() => {
    if (data) {
      setConversation(data);
    }
  }, [data]);

  return (
    <Flex direction="column" gap="xl">
      <Flex direction="column" align="center">
        <Logo maw={420} />
      </Flex>

      <Card w="100%" p="xl">
        <Flex mb="xl">
          <Title c="gray.7" order={3}>
            {conversation ? 'Update' : 'New'} Conversation
          </Title>
        </Flex>

        {isFetching && (
          <Center mih={200}>
            <Loader />
          </Center>
        )}

        {!isFetching && (
          <Tabs
            radius="lg"
            variant="outline"
            defaultValue="base"
            value={tab}
            onChange={setTab}
          >
            <Tabs.List grow>
              <Tabs.Tab value="base">Basic data</Tabs.Tab>
              <Tabs.Tab value="items" disabled={!conversation}>
                Items data
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="base">
              <Box p="lg">
                <ConversationForm
                  initConversation={conversation}
                  onSubmit={(_conversation) => {
                    if (_conversation) {
                      Router.push(
                        `/new-conversation?conversationId=${_conversation.id}`,
                      );
                      setConversation(_conversation);
                    }
                    refetch();
                  }}
                />
              </Box>
            </Tabs.Panel>

            <Tabs.Panel value="items">
              {conversation && (
                <Box pt="md">
                  <ConversationPreview
                    conversation={conversation}
                    onReload={refetch}
                  />
                </Box>
              )}
            </Tabs.Panel>
          </Tabs>
        )}
      </Card>
    </Flex>
  );
};

export default ConversationWizard;
