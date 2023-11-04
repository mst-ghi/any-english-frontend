import { Flex } from '@mantine/core';
import { useDocumentTitle } from '@mantine/hooks';
import { Envs } from '@/utils';

const EmptyPage = ({ children }: { children?: React.ReactNode }) => {
  useDocumentTitle(Envs.app.title);

  return (
    <Flex
      mih="45vh"
      align="center"
      justify="center"
      direction="column"
      gap={16}
    >
      {children}
    </Flex>
  );
};

export default EmptyPage;
