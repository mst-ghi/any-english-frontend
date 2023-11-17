import { useQuery } from '@tanstack/react-query';
import useRequest from './useRequest';

const useFetchConversations = (
  args: { page?: number | string; take?: number | string; search?: string } = {
    page: 0,
    take: 20,
  },
) => {
  const { callRequest } = useRequest();

  const fetchConversations = async (): Promise<{
    conversations: IConversation[];
    meta: IPaginationMeta;
  }> => {
    let url = `/api/v1/conversations?page=${args.page || 0}&take=${
      args.take || 20
    }`;
    if (args.search) {
      url += `&search=${args.search}`;
    }
    return await callRequest('GET', url);
  };

  const query = useQuery<{
    conversations: IConversation[];
    meta: IPaginationMeta;
  }>({
    queryKey: ['conversations', args],
    queryFn: fetchConversations,
  });

  return query;
};

export default useFetchConversations;
