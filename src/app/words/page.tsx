'use client';
import { ImageStates, Page, WordCard } from '@/components';
import { useApp, useFetchWords } from '@/hooks';
import { Flex, Group, Pagination, TextInput } from '@mantine/core';
import { useDebouncedState } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';

const WordsPage = () => {
  const Router = useRouter();
  const { statsCount } = useApp();
  const searchParams = useSearchParams();

  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useDebouncedState(
    searchParams.get('q') || '',
    500,
  );

  const { data, isFetching } = useFetchWords({
    page,
    search: searchValue,
  });

  const onSearchAction = (str: string) => {
    setSearchValue(str);
    setPage(1);
  };

  useEffect(() => {
    if (searchValue) {
      Router.push(`/words?q=${searchValue}`);
    } else {
      Router.push(`/words`);
    }
  }, [searchValue]);

  return (
    <Page title="Words" loading={isFetching}>
      <Flex direction="column" gap="sm">
        <TextInput
          size="lg"
          radius="md"
          defaultValue={searchValue}
          leftSection={<IconSearch />}
          placeholder={`Type to search on ${statsCount.wordsCount || 0} words`}
          onChange={(e) => {
            onSearchAction(e.target.value);
          }}
        />

        {data?.words[0] && (
          <Fragment>
            {data?.words.map((word) => {
              return <WordCard key={word.id} word={word} />;
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

        {!isFetching && !data?.words[0] && (
          <ImageStates name="emptyBox" message="No words found" width={360} />
        )}
      </Flex>
    </Page>
  );
};

export default WordsPage;
