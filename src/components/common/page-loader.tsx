'use client';

import { Loader, Center } from '@mantine/core';

const PageLoader = () => {
  return (
    <Center
      pos="absolute"
      left={0}
      top={0}
      w="100%"
      h="100vh - 60px"
      style={{ zIndex: 300 }}
    >
      <Loader size="xl" />
    </Center>
  );
};

export default PageLoader;
