import useRequest from '@/hooks/useRequest';
import { Box, Button, Group, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { closeAllModals } from '@mantine/modals';
import { useEffect } from 'react';
import { VoiceInput } from '..';
import {
  IconAdjustmentsStar,
  IconAlignBoxLeftMiddle,
  IconAlignBoxRightMiddle,
  IconCheck,
} from '@tabler/icons-react';

type ConversationItemFormType = {
  conversation_id: string;
  character: string;
  phrase: string;
  meaning: string;
};

const ConversationItemForm = ({
  conversationId,
  characters,
  initItem,
  onSubmit,
}: {
  conversationId: string;
  characters: string[];
  initItem?: IConversationItem;
  onSubmit?: (value: IConversationItem) => void;
}) => {
  const form = useForm<ConversationItemFormType>({
    initialValues: {
      conversation_id: conversationId,
      character: '',
      phrase: '',
      meaning: '',
    },
    validate: {
      character: (val) => (!val ? 'Character is required' : null),
      phrase: (val) => (!val ? 'Phrase is required' : null),
      meaning: (val) => (!val ? 'Meaning is required' : null),
    },
  });

  const { callRequest, isCalling } = useRequest();

  const onItemSubmit = async (values: ConversationItemFormType) => {
    const response = await callRequest<{ item: IConversationItem }>(
      initItem ? 'PUT' : 'POST',
      initItem
        ? `/api/v1/conversations/${initItem.id}/item`
        : '/api/v1/conversations/item',
      { body: values },
    );

    if (response.isUnprocessable) {
      form.setErrors(response.errors);
    } else {
      if (onSubmit) {
        onSubmit(response.item);
      }
      closeAllModals();
    }
  };

  useEffect(() => {
    if (initItem) {
      form.setValues({
        conversation_id: initItem.conversation_id,
        character: initItem.character,
        phrase: initItem.phrase,
        meaning: initItem.meaning,
      });
    }
  }, [initItem]);

  return (
    <Box>
      <form onSubmit={form.onSubmit(onItemSubmit)}>
        <Select
          withAsterisk
          label="Character"
          placeholder="Select one"
          leftSection={<IconAdjustmentsStar />}
          data={characters}
          {...form.getInputProps('character')}
        />

        <VoiceInput
          withAsterisk
          mt="md"
          label="Phrase"
          placeholder="English Value"
          leftSection={<IconAlignBoxLeftMiddle />}
          onVoiceChangeValue={(val) => form.setFieldValue('phrase', val)}
          {...form.getInputProps('phrase')}
        />

        <VoiceInput
          withAsterisk
          mt="md"
          voiceLang="fa-IR"
          label="Meaning"
          placeholder="Persian Value"
          leftSection={<IconAlignBoxRightMiddle />}
          onVoiceChangeValue={(val) => form.setFieldValue('meaning', val)}
          {...form.getInputProps('meaning')}
        />

        <Group justify="flex-end" mt="lg" mb="sm">
          <Button
            leftSection={<IconCheck />}
            size="sm"
            type="submit"
            disabled={!form.isValid()}
            loading={isCalling}
          >
            {initItem ? 'Update' : 'Save'}
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default ConversationItemForm;
