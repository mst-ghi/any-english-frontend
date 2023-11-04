import { useQuery } from '@tanstack/react-query';
import useRequest from './useRequest';

const useFetchWords = (
  args: { page?: number | string; take?: number | string; search?: string } = {
    page: 0,
    take: 10,
  },
) => {
  const { callRequest } = useRequest();

  const fetchWords = async (): Promise<{
    words: IWord[];
    meta: IPaginationMeta;
  }> => {
    let url = `/api/v1/words?page=${args.page || 0}&take=${args.take || 10}`;
    if (args.search) {
      url += `&search=${args.search}`;
    }
    return await callRequest('GET', url);
  };

  const query = useQuery<{ words: IWord[]; meta: IPaginationMeta }>({
    queryKey: ['words', args],
    queryFn: fetchWords,
  });

  return query;
};

export default useFetchWords;
