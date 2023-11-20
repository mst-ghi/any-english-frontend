import { Card, Flex, Title } from '@mantine/core';
import { ConversationForm, Logo } from '..';

import { useRouter } from 'next/navigation';

const ConversationWizard = () => {
  const Router = useRouter();

  return (
    <Flex direction="column" gap="xl">
      <Flex direction="column" align="center">
        <Logo maw={420} />
      </Flex>

      <Card w="100%" p="xl">
        <Flex mb="xl">
          <Title c="gray.7" order={3}>
            New Conversation
          </Title>
        </Flex>

        <ConversationForm
          onSubmit={(_conversation) => {
            if (_conversation) {
              Router.push(`/conversations/${_conversation.id}`);
            }
          }}
        />
      </Card>
    </Flex>
  );
};

export default ConversationWizard;
