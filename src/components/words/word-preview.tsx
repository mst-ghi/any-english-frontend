import { ActionIcon, Flex } from '@mantine/core';
import { useSpeechSynthesis } from 'react-speech-kit';
import { IconVolume } from '@tabler/icons-react';
import { TextBlur } from '..';

const WordPreview = ({
  word,
  display = 'both',
}: {
  word: IWord;
  display?: TTextDisplay;
}) => {
  const { speak, speaking } = useSpeechSynthesis();

  return (
    <Flex direction="row" align="center" justify="space-between" px="sm" pb={4}>
      <Flex direction="row" align="center" gap={4}>
        <ActionIcon
          disabled={speaking}
          variant="transparent"
          radius="md"
          size="sm"
          onClick={() => speak({ text: word.word, rate: 0.6 })}
        >
          <IconVolume size={18} />
        </ActionIcon>

        <TextBlur
          size="xl"
          fw={600}
          value={word.word}
          blur={display === 'fa'}
          style={{ textTransform: 'capitalize' }}
        />
      </Flex>

      <TextBlur
        size="sm"
        dir="rtl"
        value={word.meaning}
        blur={display === 'en'}
      />
    </Flex>
  );
};

export default WordPreview;
