import {
  ActionIcon,
  Card,
  Flex,
  MantineColor,
  StyleProp,
  Text,
} from '@mantine/core';
import { PhraseForm, PhraseLightnerAction, TextBlur } from '..';
import { IconEdit, IconTrash, IconVolume } from '@tabler/icons-react';
import { openConfirmModal, openModal } from '@mantine/modals';
import useRequest from '@/hooks/useRequest';
import { useQueryClient } from '@tanstack/react-query';
import { useApp, useFetchData } from '@/hooks';
import { useSpeechSynthesis } from 'react-speech-kit';
import { Fragment, useEffect, useState } from 'react';

const PhrasePreview = ({
  phrase,
  display = 'both',
}: {
  phrase: IPhrase;
  display?: TTextDisplay;
}) => {
  const queryClient = useQueryClient();
  const { callRequest } = useRequest();
  const { isAdmin } = useApp();
  const { speak, speaking } = useSpeechSynthesis();
  const { fetchPhrase } = useFetchData();

  const [phraseData, setPhraseData] = useState<IPhrase>(phrase);

  const onDeletePhrase = async () => {
    await callRequest('DELETE', `/api/v1/phrases/${phraseData.id}`);
    queryClient.invalidateQueries({ queryKey: ['words'], stale: true });
    queryClient.invalidateQueries({ queryKey: ['phrases'], stale: true });
  };

  useEffect(() => {
    setPhraseData(phrase);
  }, [phrase]);

  return (
    <Card withBorder pb="xs">
      <Card.Section px="md" pt="xs">
        <TextBlur
          size="sm"
          fw={600}
          value={phraseData.phrase}
          blur={display === 'fa'}
        />

        <TextBlur
          mt={4}
          dir="rtl"
          size="sm"
          value={phraseData.meaning}
          blur={display === 'en'}
        />
      </Card.Section>

      <Flex direction="row" align="center" gap="sm" mt={4}>
        <ActionIcon
          disabled={speaking}
          variant="transparent"
          radius="md"
          size="sm"
          onClick={() => speak({ text: phraseData.phrase, rate: 0.8 })}
        >
          <IconVolume size={18} />
        </ActionIcon>

        <PhraseLightnerAction
          phraseId={phraseData.id}
          lightners={phraseData.lightners}
          onReload={async () => {
            setPhraseData(await fetchPhrase(phraseData.id));
          }}
        />

        {isAdmin && (
          <Fragment>
            <ActionIcon
              variant="transparent"
              radius="md"
              size="sm"
              color="grape"
              onClick={() => {
                openModal({
                  title: 'Update Phrase',
                  children: <PhraseForm initPhrase={phraseData} />,
                  closeOnClickOutside: false,
                  closeOnEscape: false,
                });
              }}
            >
              <IconEdit size={18} />
            </ActionIcon>

            <ActionIcon
              variant="transparent"
              radius="md"
              size="sm"
              color="red"
              onClick={() => {
                openConfirmModal({
                  title: (
                    <Text size="xl" fw={600}>
                      Delete Phrase
                    </Text>
                  ),
                  children: <Text>Are you sure to delete this phrase?</Text>,
                  confirmProps: {
                    color: 'red',
                  },
                  onConfirm: onDeletePhrase,
                });
              }}
            >
              <IconTrash size={18} />
            </ActionIcon>
          </Fragment>
        )}
      </Flex>
    </Card>
  );
};

export default PhrasePreview;
