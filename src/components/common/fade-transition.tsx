import { Box, Transition } from '@mantine/core';

const FadeTransition = ({
  mounted,
  children,
}: {
  mounted: boolean;
  children?: React.ReactNode;
}) => {
  return (
    <Transition mounted={mounted} transition="fade" timingFunction="all">
      {(styles) => <Box style={styles}>{children}</Box>}
    </Transition>
  );
};

export default FadeTransition;
