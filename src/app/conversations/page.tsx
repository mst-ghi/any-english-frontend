'use client';
import { ImageStates, Page, ConversationPreview } from '@/components';
import { useFetchConversations } from '@/hooks';
import { Flex, Group, Pagination, TextInput } from '@mantine/core';
import { useDebouncedState } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';

const ConversationsPage = () => {
  const Router = useRouter();
  const searchParams = useSearchParams();

  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useDebouncedState(
    searchParams.get('q') || '',
    500,
  );

  const { data, isFetching } = useFetchConversations({
    page,
    search: searchValue,
  });

  const onSearchAction = (str: string) => {
    setSearchValue(str);
    setPage(1);
  };

  useEffect(() => {
    setSearchValue(searchParams.get('q') || '');
  }, [searchParams.get('q')]);

  useEffect(() => {
    if (searchValue) {
      Router.push(`/conversations?q=${searchValue}`);
    } else {
      Router.push(`/conversations`);
    }
  }, [searchValue]);

  return (
    <Page title="Conversations" loading={isFetching}>
      <Flex direction="column" gap="sm">
        <TextInput
          size="lg"
          radius="md"
          defaultValue={searchValue}
          leftSection={<IconSearch />}
          placeholder={`Type to search on conversations`}
          onChange={(e: any) => {
            onSearchAction(e.target.value);
          }}
        />

        {data?.conversations[0] && (
          <Fragment>
            {data?.conversations.map((conversation) => {
              return (
                <Link
                  key={conversation.id}
                  href={`/conversations/${conversation.id}`}
                >
                  <ConversationPreview conversation={conversation} compact />
                </Link>
              );
            })}
            <Group justify="center" mt="sm">
              <Pagination.Root
                value={page}
                onChange={(val) => setPage(val)}
                total={data.meta.total_pages}
              >
                <Group gap={8}>
                  <Pagination.Previous />
                  <Pagination.Items />
                  <Pagination.Next />
                </Group>
              </Pagination.Root>
            </Group>
          </Fragment>
        )}

        {!isFetching && !data?.conversations[0] && (
          <ImageStates
            name="emptyBox"
            message="No conversations found"
            width={360}
          />
        )}
      </Flex>
    </Page>
  );
};

export default ConversationsPage;
