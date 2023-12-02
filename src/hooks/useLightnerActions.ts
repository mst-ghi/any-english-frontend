import { useQueryClient } from '@tanstack/react-query';
import useRequest from './useRequest';

const useLightnerActions = () => {
  const queryClient = useQueryClient();
  const { callRequest, isCalling } = useRequest();

  const upsertLightnerWord = async (wordId: string, level: TLightnerLevel) => {
    await callRequest('PUT', '/api/v1/lightner/word', {
      body: {
        word_id: wordId,
        level,
      },
    });

    queryClient.invalidateQueries({ queryKey: ['lightners'], stale: true });
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

    queryClient.invalidateQueries({ queryKey: ['lightners'], stale: true });
  };

  return {
    isProcessing: isCalling,
    upsertLightnerWord,
    upsertLightnerPhrase,
  };
};

export default useLightnerActions;
