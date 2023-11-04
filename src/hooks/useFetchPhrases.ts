import { useQuery } from '@tanstack/react-query';
import useRequest from './useRequest';

const useFetchPhrases = (
  args: { page?: number | string; take?: number | string; search?: string } = {
    page: 0,
    take: 20,
  },
) => {
  const { callRequest } = useRequest();

  const fetchPhrases = async (): Promise<{
    phrases: IPhrase[];
    meta: IPaginationMeta;
  }> => {
    let url = `/api/v1/phrases?page=${args.page || 0}&take=${args.take || 20}`;
    if (args.search) {
      url += `&search=${args.search}`;
    }
    return await callRequest('GET', url);
  };

  const query = useQuery<{ phrases: IPhrase[]; meta: IPaginationMeta }>({
    queryKey: ['phrases', args],
    queryFn: fetchPhrases,
  });

  return query;
};

export default useFetchPhrases;
