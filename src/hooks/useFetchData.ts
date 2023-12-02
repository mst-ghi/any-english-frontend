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

  const fetchConversation = async (conversationId: string) => {
    const response = await callRequest<{ conversation: IConversation }>(
      'GET',
      `/api/v1/conversations/${conversationId}`,
    );
    return response?.conversation;
  };

  const fetchLightnerCounts = async () => {
    const response = await callRequest<{ word_id: number; phrase_id: number }>(
      'GET',
      `/api/v1/lightner/counts`,
    );
    return response;
  };

  return {
    isCalling,
    fetchWord,
    fetchPhrase,
    fetchConversation,
    fetchLightnerCounts,
  };
};

export default useFetchData;
