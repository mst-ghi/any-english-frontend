'use client';
import { Logo, Page, SearchInput } from '@/components';
import { useApp } from '@/hooks';
import { Card, Center, Flex, SimpleGrid, Text } from '@mantine/core';

const HomePage = () => {
  const { statsCount } = useApp();

  return (
    <Page title="Home">
      <Center mih={360} style={{ display: 'flex', flexDirection: 'column' }}>
        <Logo maw={400} mb="xl" />
        <SearchInput />
      </Center>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
        {statsCount?.wordsCount && (
          <Center>
            <Card radius="lg" shadow="xl" w="100%" h={160}>
              <Flex direction="column" align="center" justify="center" h="100%">
                <Text fz={32} fw={600}>
                  {statsCount?.wordsCount}
                </Text>
                <Text>Words</Text>
              </Flex>
            </Card>
          </Center>
        )}

        {statsCount?.phrasesCount && (
          <Center>
            <Card radius="lg" shadow="xl" w="100%" h={160}>
              <Flex direction="column" align="center" justify="center" h="100%">
                <Text fz={32} fw={600}>
                  {statsCount?.phrasesCount}
                </Text>
                <Text>Phrases</Text>
              </Flex>
            </Card>
          </Center>
        )}

        {statsCount?.conversationsCount && (
          <Center>
            <Card radius="lg" shadow="xl" w="100%" h={160}>
              <Flex direction="column" align="center" justify="center" h="100%">
                <Text fz={32} fw={600}>
                  {statsCount?.conversationsCount}
                </Text>
                <Text>Conversations</Text>
              </Flex>
            </Card>
          </Center>
        )}
      </SimpleGrid>
    </Page>
  );
};

export default HomePage;
