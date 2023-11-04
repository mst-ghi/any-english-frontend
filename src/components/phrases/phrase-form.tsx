import { Box, Button, Group, TextInput } from '@mantine/core';
import { VoiceInput, WordPreview } from '..';
import { useQueryClient } from '@tanstack/react-query';
import { closeAllModals } from '@mantine/modals';
import { useForm } from '@mantine/form';
import useRequest from '@/hooks/useRequest';

type PhraseFormProps = {
  word?: IWord;
  initPhrase?: IPhrase;
  onSubmitDone?: () => void;
};

type PhraseFormType = {
  word_id: string;
  phrase: string;
  meaning: string;
};

const PhraseForm = ({ word, initPhrase, onSubmitDone }: PhraseFormProps) => {
  const queryClient = useQueryClient();
  const { callRequest, isCalling } = useRequest();

  const form = useForm<PhraseFormType>({
    initialValues: {
      word_id: initPhrase?.word_id || word?.id || '',
      phrase: initPhrase?.phrase || '',
      meaning: initPhrase?.meaning || '',
    },
    validate: {
      phrase: (val) => (!val ? 'Phrase is required' : null),
      meaning: (val) => (!val ? 'Meaning is required' : null),
    },
  });

  const onSubmit = async (values: PhraseFormType) => {
    const url = initPhrase
      ? `/api/v1/phrases/${initPhrase.id}`
      : '/api/v1/phrases';

    await callRequest(initPhrase ? 'PUT' : 'POST', url, { body: values });

    if (onSubmitDone) {
      onSubmitDone();
    }

    queryClient.invalidateQueries({ queryKey: ['words'], stale: true });
    queryClient.invalidateQueries({ queryKey: ['phrases'], stale: true });
    closeAllModals();
  };

  return (
    <Box>
      {word && <WordPreview word={word} />}

      <form onSubmit={form.onSubmit(onSubmit)}>
        <VoiceInput
          withAsterisk
          label="Phrase"
          placeholder="English value"
          mt={word ? 'lg' : undefined}
          onVoiceChangeValue={(val) => form.setFieldValue('phrase', val)}
          {...form.getInputProps('phrase')}
        />

        <VoiceInput
          withAsterisk
          voiceLang="fa-IR"
          label="Meaning"
          placeholder="Persian value"
          mt={10}
          onVoiceChangeValue={(val) => form.setFieldValue('meaning', val)}
          {...form.getInputProps('meaning')}
        />

        <Group justify="flex-end" mt="lg">
          <Button type="submit" disabled={!form.isValid()} loading={isCalling}>
            {initPhrase ? 'Update' : 'Save'}
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default PhraseForm;
