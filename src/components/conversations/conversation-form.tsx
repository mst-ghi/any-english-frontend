import {
  Box,
  Button,
  Group,
  SimpleGrid,
  TagsInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import {
  IconAdjustmentsStar,
  IconAlignBoxLeftMiddle,
  IconAlignBoxRightMiddle,
  IconCheck,
} from '@tabler/icons-react';
import useRequest from '@/hooks/useRequest';
import { closeAllModals } from '@mantine/modals';
import { VoiceInput } from '..';
import { useEffect } from 'react';

type ConversationFormType = {
  title: string;
  meaning: string;
  characters: string[];
};

const ConversationForm = ({
  initConversation,
  onSubmit,
}: {
  initConversation?: IConversation;
  onSubmit?: (value: IConversation) => void;
}) => {
  const form = useForm<ConversationFormType>({
    initialValues: {
      title: '',
      meaning: '',
      characters: [],
    },
    validate: {
      title: (val) => (!val ? 'Title is required' : null),
      meaning: (val) => (!val ? 'Meaning is required' : null),
      characters: (val) => (!val || !val[0] ? 'Characters is required' : null),
    },
  });

  const { callRequest, isCalling } = useRequest();

  const onConversationSubmit = async (values: ConversationFormType) => {
    const response = await callRequest<{ conversation: IConversation }>(
      initConversation ? 'PUT' : 'POST',
      initConversation
        ? `/api/v1/conversations/${initConversation.id}`
        : '/api/v1/conversations',
      { body: values },
    );

    if (response.isUnprocessable) {
      form.setErrors(response.errors);
    } else {
      if (onSubmit) {
        onSubmit(response.conversation);
      }
      closeAllModals();
    }
  };

  useEffect(() => {
    if (initConversation) {
      form.setValues({
        title: initConversation.title,
        meaning: initConversation.meaning,
        characters: initConversation.characters,
      });
    }
  }, [initConversation]);

  return (
    <Box>
      <Box mt="md">
        <form onSubmit={form.onSubmit(onConversationSubmit)}>
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
            <VoiceInput
              withAsterisk
              label="Title"
              placeholder="English Value"
              leftSection={<IconAlignBoxLeftMiddle />}
              onVoiceChangeValue={(val) => form.setFieldValue('title', val)}
              {...form.getInputProps('title')}
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

          <TagsInput
            withAsterisk
            mt="md"
            label="Characters"
            placeholder="Type and press enter"
            leftSection={<IconAdjustmentsStar />}
            {...form.getInputProps('characters')}
          />

          <Group justify="flex-end" mt="lg" mb="sm">
            <Button
              leftSection={<IconCheck />}
              size="sm"
              type="submit"
              disabled={!form.isValid()}
              loading={isCalling}
            >
              {initConversation ? 'Update' : 'Save'} {' & Continue'}
            </Button>
          </Group>
        </form>
      </Box>
    </Box>
  );
};

export default ConversationForm;
