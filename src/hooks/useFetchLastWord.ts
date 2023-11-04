import { useQuery } from '@tanstack/react-query';
import useRequest from './useRequest';

const useFetchLastWord = () => {
  const { callRequest } = useRequest();

  const fetchLastWord = async (): Promise<IWord> => {
    const response = await callRequest<{ word: IWord }>(
      'GET',
      `/api/v1/stats/last/word`,
    );
    return response?.word;
  };

  const query = useQuery<IWord>({
    queryKey: ['last-word'],
    queryFn: fetchLastWord,
  });

  return query;
};

export default useFetchLastWord;
