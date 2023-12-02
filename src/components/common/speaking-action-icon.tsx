import { ActionIcon, ActionIconProps } from '@mantine/core';
import { IconVolume } from '@tabler/icons-react';
import { useSpeechSynthesis } from 'react-speech-kit';

const SpeakingActionIcon = ({
  value,
  size = 'sm',
  iconSize,
}: { value?: string; iconSize?: number } & ActionIconProps) => {
  const { speak, speaking } = useSpeechSynthesis();

  return (
    <ActionIcon
      disabled={speaking}
      variant="transparent"
      radius="md"
      size={size}
      onClick={() => speak({ text: value, rate: 0.6 })}
    >
      <IconVolume size={iconSize} />
    </ActionIcon>
  );
};

export default SpeakingActionIcon;
