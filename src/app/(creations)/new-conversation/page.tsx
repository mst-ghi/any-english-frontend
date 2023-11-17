'use client';
import { ConversationWizard, Page } from '@/components';
import { useSearchParams } from 'next/navigation';

const NewConversationPage = () => {
  const searchParams = useSearchParams();

  return (
    <Page title="New Conversation">
      <ConversationWizard
        initConversationId={searchParams.get('conversationId')}
      />
    </Page>
  );
};

export default NewConversationPage;
