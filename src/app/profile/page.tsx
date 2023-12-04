'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Page, MyLightner } from '@/components';
import { useAuth } from '@/components/auth';
import { useFetchData, useThemeStyle } from '@/hooks';
import {
  Avatar,
  Box,
  Button,
  Card,
  Center,
  Flex,
  SimpleGrid,
  Text,
  Title,
} from '@mantine/core';

const ProfilePage = () => {
  const { user } = useAuth();
  const { isDesktop } = useThemeStyle();
  const { fetchLightnerCounts } = useFetchData();

  const [lightner, setLightner] = useState<'word' | 'phrase'>('word');

  const { data, isFetching } = useQuery<{ word_id: number; phrase_id: number }>(
    {
      queryKey: ['lightners', 'counts'],
      queryFn: fetchLightnerCounts,
    },
  );

  return (
    <Page title={user.fullname} loading={isFetching}>
      <Card withBorder>
        <SimpleGrid
          cols={{ base: 1, md: 2 }}
          spacing="lg"
          px={isDesktop ? 'md' : 0}
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

              <Title order={5} fw={400}>
                {user.email}
              </Title>
            </Flex>
          </Flex>

          <Flex
            direction="row"
            align="center"
            justify={isDesktop ? 'end' : 'center'}
          >
            <Button
              w={120}
              h={90}
              radius="lg"
              mx="sm"
              color={lightner === 'word' ? 'blue' : 'gray.5'}
              onClick={() => setLightner('word')}
            >
              <Flex direction="column" align="center" justify="center">
                <Text fz={32} fw={600}>
                  {data?.word_id || 0}
                </Text>
                <Text size="sm">Words</Text>
              </Flex>
            </Button>

            <Button
              w={120}
              h={90}
              radius="lg"
              mx="sm"
              color={lightner === 'phrase' ? 'blue' : 'gray.5'}
              onClick={() => setLightner('phrase')}
            >
              <Flex direction="column" align="center" justify="center">
                <Text fz={32} fw={600}>
                  {data?.phrase_id || 0}
                </Text>
                <Text size="sm">Phrases</Text>
              </Flex>
            </Button>
          </Flex>
        </SimpleGrid>

        <Box mt="lg" px={isDesktop ? 'md' : undefined}>
          <MyLightner type={lightner} />
        </Box>
      </Card>
    </Page>
  );
};

export default ProfilePage;
