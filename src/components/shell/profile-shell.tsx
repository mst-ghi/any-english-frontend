import { Avatar, Box, Card, Divider, Flex, Text } from '@mantine/core';
import { useAuth } from '../auth';

const ProfileShell = ({ children }: { children?: React.ReactNode }) => {
  const { user } = useAuth();

  return (
    <Flex direction="row" gap="lg" pos="relative" justify="flex-end">
      <Card w={330} px="xs" withBorder className="profile-sidebar">
        <Card.Section px="lg" pt="md">
          <Flex direction="row" align="center" gap="xs">
            <Avatar size="lg" radius="lg" />

            <Flex direction="column">
              <Text size="sm" fw={600} style={{ textTransform: 'capitalize' }}>
                {user.fullname}
              </Text>

              <Text
                fz={10}
                mt={4}
                truncate
                c="gray"
                style={{ textTransform: 'lowercase' }}
              >
                {user.email}
              </Text>
            </Flex>
          </Flex>
        </Card.Section>

        <Divider my="md" />
      </Card>

      <Box className="profile-content">{children}</Box>
    </Flex>
  );
};

export default ProfileShell;
