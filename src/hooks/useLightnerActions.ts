import useRequest from './useRequest';

const useLightnerActions = () => {
  const { callRequest, isCalling } = useRequest();

  const upsertLightnerWord = async (wordId: string, level: TLightnerLevel) => {
    await callRequest('PUT', '/api/v1/lightner/word', {
      body: {
        word_id: wordId,
        level,
      },
    });
  };

  const upsertLightnerPhrase = async (
    phraseId: string,
    level: TLightnerLevel,
  ) => {
    await callRequest('PUT', '/api/v1/lightner/phrase', {
      body: {
        phrase_id: phraseId,
        level,
      },
    });
  };

  return {
    isProcessing: isCalling,
    upsertLightnerWord,
    upsertLightnerPhrase,
  };
};

export default useLightnerActions;
