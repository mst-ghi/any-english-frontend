import { useApp, useLightnerActions } from '@/hooks';
import { ActionIcon } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconBrain } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';

type PhraseLightnerActionProps = {
  phraseId: string;
  lightners?: ILightner[];
  onReload: () => void;
};

const PhraseLightnerAction = ({
  phraseId,
  lightners,
  onReload,
}: PhraseLightnerActionProps) => {
  const { isLoggedIn } = useApp();
  const queryClient = useQueryClient();
  const { isProcessing, upsertLightnerPhrase } = useLightnerActions();

  const includingLightner = useMemo(() => {
    return lightners && lightners[0];
  }, [lightners]);

  const onLightnerPhrase = async () => {
    await upsertLightnerPhrase(phraseId, includingLightner ? 0 : 4);

    if (includingLightner) {
      showNotification({
        color: 'red',
        message: 'The phrase removed from lightner',
      });
    } else {
      showNotification({
        color: 'green',
        message: 'The phrase added to your lightner',
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
      radius="md"
      size="sm"
      variant="transparent"
      color={!includingLightner ? 'green' : 'orange'}
      onClick={onLightnerPhrase}
    >
      <IconBrain size={18} />
    </ActionIcon>
  );
};

export default PhraseLightnerAction;
