'use client';

import { Page, PhrasePreview, WordCard } from '@/components';
import { useFetchLightner } from '@/hooks';
import {
  Card,
  Center,
  Flex,
  Group,
  Loader,
  Pagination,
  Tabs,
  Title,
} from '@mantine/core';
import { IconBlockquote, IconLetterW } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';

const ProfilePage = () => {
  const Router = useRouter();
  const [activeType, setActiveType] = useState<TLightnerType>('word');

  const [page, setPage] = useState(1);
  const { data, isFetching } = useFetchLightner({
    page,
    type: activeType,
  });

  useEffect(() => {
    if (activeType) {
      Router.push(`/profile/my-lightner?type=${activeType}`);
    }
  }, [activeType]);

  return (
    <Page title="My Lightner">
      <Card>
        <Title mb="sm" order={2}>
          My Lightner
        </Title>
        <Tabs
          radius="md"
          variant="outline"
          value={activeType}
          onChange={(val) => {
            setActiveType(val as TLightnerType);
            setPage(1);
          }}
        >
          <Tabs.List grow>
            <Tabs.Tab
              value="word"
              leftSection={<IconLetterW size={20} color="gray" />}
            >
              Words
            </Tabs.Tab>
            <Tabs.Tab
              value="phrase"
              leftSection={<IconBlockquote size={20} color="gray" />}
            >
              Phrases
            </Tabs.Tab>
          </Tabs.List>

          {isFetching && (
            <Center mih={200}>
              <Loader />
            </Center>
          )}

          {!isFetching && (
            <Fragment>
              <Tabs.Panel value="word">
                {activeType === 'word' && (
                  <Flex direction="column" gap="md" pt="md">
                    {data?.lightners.map(({ id, word }) => {
                      return (
                        <WordCard key={`lightner-${id}`} word={word} compact />
                      );
                    })}
                  </Flex>
                )}
              </Tabs.Panel>

              <Tabs.Panel value="phrase">
                {activeType === 'phrase' && (
                  <Flex direction="column" gap="md" pt="md">
                    {data?.lightners.map(({ id, phrase }) => {
                      return (
                        <PhrasePreview key={`lightner-${id}`} phrase={phrase} />
                      );
                    })}
                  </Flex>
                )}
              </Tabs.Panel>
            </Fragment>
          )}
        </Tabs>

        {!isFetching && (
          <Group justify="center" mt="sm">
            <Pagination.Root
              value={page}
              onChange={(val) => setPage(val)}
              total={data?.meta.total_pages}
            >
              <Group gap={8}>
                <Pagination.Previous />
                <Pagination.Items />
                <Pagination.Next />
              </Group>
            </Pagination.Root>
          </Group>
        )}
      </Card>
    </Page>
  );
};

export default ProfilePage;
