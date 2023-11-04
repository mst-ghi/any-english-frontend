import {
  Box,
  Button,
  Group,
  SimpleGrid,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import {
  IconAlignBoxLeftMiddle,
  IconAlignBoxRightMiddle,
  IconCheck,
} from '@tabler/icons-react';
import useRequest from '@/hooks/useRequest';
import { closeAllModals } from '@mantine/modals';
import { VoiceInput } from '..';

type NewWordFormType = {
  word: string;
  meaning: string;
};

const WordForm = ({
  initWord,
  onSubmit,
}: {
  initWord?: IWord;
  onSubmit?: (value: IWord) => void;
}) => {
  const form = useForm<NewWordFormType>({
    initialValues: {
      word: initWord?.word || '',
      meaning: initWord?.meaning || '',
    },
    validate: {
      word: (val) => (!val ? 'Word is required' : null),
      meaning: (val) => (!val ? 'Meaning is required' : null),
    },
  });

  const { callRequest, isCalling } = useRequest();

  const onWordSubmit = async (values: NewWordFormType) => {
    const response = await callRequest<{ word: IWord }>(
      initWord ? 'PUT' : 'POST',
      initWord ? `/api/v1/words/${initWord.id}` : '/api/v1/words',
      { body: values },
    );

    if (response.isUnprocessable) {
      form.setErrors(response.errors);
    } else {
      if (onSubmit) {
        onSubmit(response.word);
      }
      form.reset();
      closeAllModals();
    }
  };

  return (
    <Box>
      <Title c="gray.7" order={3}>
        {initWord ? 'Update' : 'New'} Word
      </Title>

      <Box mt="md">
        <form onSubmit={form.onSubmit(onWordSubmit)}>
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
            <VoiceInput
              withAsterisk
              label="Word"
              placeholder="English Value"
              leftSection={<IconAlignBoxLeftMiddle />}
              onVoiceChangeValue={(val) => form.setFieldValue('word', val)}
              {...form.getInputProps('word')}
            />

            <VoiceInput
              withAsterisk
              voiceLang="fa-IR"
              label="Meaning"
              placeholder="Persian Value"
              leftSection={<IconAlignBoxRightMiddle />}
              onVoiceChangeValue={(val) => form.setFieldValue('meaning', val)}
              {...form.getInputProps('meaning')}
            />
          </SimpleGrid>

          <Group justify="flex-end" mt="lg" mb="sm">
            <Button
              leftSection={<IconCheck />}
              size="md"
              type="submit"
              disabled={!form.isValid()}
              loading={isCalling}
            >
              {initWord ? 'Update' : 'Save'}
            </Button>
          </Group>
        </form>
      </Box>
    </Box>
  );
};

export default WordForm;
