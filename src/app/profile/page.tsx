'use client';

import { Page } from '@/components';
import { useAuth } from '@/components/auth';
import { useFetchData, useThemeStyle } from '@/hooks';
import {
  Avatar,
  Button,
  Card,
  Center,
  Flex,
  SimpleGrid,
  Text,
  Title,
} from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

const ProfilePage = () => {
  const { user } = useAuth();
  const { isDesktop } = useThemeStyle();
  const { fetchLightnerCounts } = useFetchData();

  const { data } = useQuery<{ word_id: number; phrase_id: number }>({
    queryKey: ['lightners', 'counts'],
    queryFn: fetchLightnerCounts,
  });

  return (
    <Page title={user.fullname}>
      <Card>
        <SimpleGrid
          cols={{ base: 1, md: 2 }}
          spacing="lg"
          px={isDesktop ? 46 : 0}
          mb="lg"
        >
          <Flex direction="row" align="center" gap="md">
            <Center my="lg">
              <Avatar variant="light" color="blue" size={isDesktop ? 92 : 74} />
            </Center>

            <Flex direction="column" justify="center">
              <Title mb={8} order={3}>
                {user.fullname}
              </Title>

              <Title order={5} c="gray" fw={400}>
                {user.email}
              </Title>
            </Flex>
          </Flex>

          <Flex
            direction="row"
            gap="xl"
            align="center"
            justify={isDesktop ? 'end' : 'center'}
          >
            <Flex direction="column" align="center" justify="center" mx="sm">
              <Text fz={32} fw={600}>
                {data?.word_id || 0}
              </Text>
              <Text c="gray.7" size="sm">
                Words
              </Text>
            </Flex>

            <Flex direction="column" align="center" justify="center" mx="sm">
              <Text fz={32} fw={600}>
                {data?.phrase_id || 0}
              </Text>
              <Text c="gray.7" size="sm">
                Phrases
              </Text>
            </Flex>
          </Flex>
        </SimpleGrid>

        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg" my="xl" px="xl">
          <Button
            fullWidth
            variant="light"
            size="lg"
            component={Link}
            href={'/profile/words'}
          >
            My Words
          </Button>

          <Button
            fullWidth
            variant="light"
            size="lg"
            component={Link}
            href={'/profile/phrases'}
          >
            My Phrases
          </Button>
        </SimpleGrid>
      </Card>
    </Page>
  );
};

export default ProfilePage;
