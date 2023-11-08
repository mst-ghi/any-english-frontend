import useRequest from './useRequest';

const useFetchData = () => {
  const { callRequest, isCalling } = useRequest();

  const fetchWord = async (wordId: string) => {
    const response = await callRequest<{ word: IWord }>(
      'GET',
      `/api/v1/words/${wordId}`,
    );
    return response?.word;
  };

  const fetchPhrase = async (phraseId: string) => {
    const response = await callRequest<{ phrase: IPhrase }>(
      'GET',
      `/api/v1/phrases/${phraseId}`,
    );
    return response?.phrase;
  };

  return {
    isCalling,
    fetchWord,
    fetchPhrase,
  };
};

export default useFetchData;
