import { useApp, useLightnerActions } from '@/hooks';
import { ActionIcon } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconBrain } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';

type WordLightnerActionProps = {
  wordId: string;
  lightners?: ILightner[];
  onReload: () => void;
};

const WordLightnerAction = ({
  wordId,
  lightners,
  onReload,
}: WordLightnerActionProps) => {
  const { isLoggedIn } = useApp();
  const queryClient = useQueryClient();
  const { isProcessing, upsertLightnerWord } = useLightnerActions();

  const includingLightner = useMemo(() => {
    return lightners && lightners[0];
  }, [lightners]);

  const onLightnerWord = async () => {
    await upsertLightnerWord(wordId, includingLightner ? 0 : 4);

    if (includingLightner) {
      showNotification({
        color: 'red',
        message: 'The word removed from lightner',
      });
    } else {
      showNotification({
        color: 'green',
        message: 'The word added to your lightner',
      });
    }

    queryClient.invalidateQueries({ queryKey: ['lightners'], stale: true });

    onReload();
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <ActionIcon
      disabled={isProcessing}
      size="md"
      radius="md"
      h={28}
      color={!includingLightner ? 'green' : 'orange'}
      onClick={onLightnerWord}
    >
      <IconBrain size={18} />
    </ActionIcon>
  );
};

export default WordLightnerAction;
