'use client';
import { ConversationPreview, ImageStates, Page } from '@/components';
import { useFetchData } from '@/hooks';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

const ConversationPage = () => {
  const { id } = useParams();
  const { fetchConversation } = useFetchData();

  const {
    data: conversation,
    refetch,
    isFetching,
  } = useQuery<IConversation>({
    queryKey: ['conversation', id],
    queryFn: () => fetchConversation(id as string),
    enabled: !!id,
  });

  return (
    <Page
      title={isFetching ? 'Loading' : conversation?.title}
      loading={isFetching}
    >
      {conversation && (
        <ConversationPreview conversation={conversation} onReload={refetch} />
      )}
      {!conversation && <ImageStates name="noMessages" />}
    </Page>
  );
};

export default ConversationPage;
