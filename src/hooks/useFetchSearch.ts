import { useQuery } from '@tanstack/react-query';
import useRequest from './useRequest';

type UseFetchSearchType = {
  words: IWord[];
  phrases: IPhrase[];
  conversations: IConversation[];
};

const useFetchSearch = (
  args: { take?: number | string; search?: string } = {
    take: 5,
  },
) => {
  const { callRequest } = useRequest();

  const fetchData = async (): Promise<UseFetchSearchType> => {
    const url = `/api/v1/search?search=${args.search}&take=${args.take || 5}`;
    return await callRequest('GET', url);
  };

  const query = useQuery<UseFetchSearchType>({
    queryKey: ['search-data', args],
    queryFn: fetchData,
  });

  return query;
};

export default useFetchSearch;
