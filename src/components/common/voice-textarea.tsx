import { ActionIcon, TextareaProps, Textarea } from '@mantine/core';
import { useDebouncedState } from '@mantine/hooks';
import { IconMicrophone, IconVolume } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useSpeechRecognition } from 'react-speech-kit';

type VoiceTextareaProps = Omit<TextareaProps, 'rightSection'> & {
  voiceLang?: 'en-US' | 'fa-IR';
  onVoiceChangeValue?: (val: string) => void;
};

const VoiceTextarea = ({
  voiceLang = 'en-US',
  onVoiceChangeValue,
  ...props
}: VoiceTextareaProps) => {
  const [value, setValue] = useDebouncedState('', 50);
  const [blocked, setBlocked] = useState(false);

  const onResult = (result) => {
    setValue(result);
  };

  const onError = (event) => {
    if (event.error === 'not-allowed') {
      setBlocked(true);
    }
  };

  const { listen, listening, stop, supported } = useSpeechRecognition({
    onResult,
    onError,
  });

  const toggle = () => {
    try {
      if (listening) {
        stop();
      } else {
        setBlocked(false);
        listen({ lang: voiceLang });
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (onVoiceChangeValue && value) {
      onVoiceChangeValue(value);
    }
  }, [value]);

  useEffect(() => {
    return () => stop();
  }, []);

  return (
    <Textarea
      rightSection={
        supported ? (
          <ActionIcon
            disabled={blocked}
            color={listening ? 'orange' : undefined}
            onClick={toggle}
          >
            {listening ? (
              <IconVolume size={20} />
            ) : (
              <IconMicrophone size={20} />
            )}
          </ActionIcon>
        ) : undefined
      }
      error={
        blocked
          ? 'The microphone is blocked for this site in your browser.'
          : undefined
      }
      {...props}
      onFocus={() => {
        if (listening) {
          stop();
        }
      }}
    />
  );
};

export default VoiceTextarea;
