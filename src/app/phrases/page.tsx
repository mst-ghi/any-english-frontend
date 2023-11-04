'use client';
import { ImageStates, Page, PhrasePreview } from '@/components';
import { useApp, useFetchPhrases } from '@/hooks';
import { Flex, Group, Pagination, TextInput } from '@mantine/core';
import { useDebouncedState } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';

const PhrasesPage = () => {
  const Router = useRouter();
  const { statsCount } = useApp();
  const searchParams = useSearchParams();

  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useDebouncedState(
    searchParams.get('q') || '',
    500,
  );

  const { data, isFetching } = useFetchPhrases({ page, search: searchValue });

  const onSearchAction = (str: string) => {
    setSearchValue(str);
    setPage(1);
  };

  useEffect(() => {
    if (searchValue) {
      Router.push(`/phrases?q=${searchValue}`);
    } else {
      Router.push(`/phrases`);
    }
  }, [searchValue]);

  return (
    <Page title="Phrases" loading={isFetching}>
      <Flex direction="column" gap="sm">
        <TextInput
          size="lg"
          radius="md"
          defaultValue={searchValue}
          leftSection={<IconSearch />}
          placeholder={`Type to search on ${
            statsCount.phrasesCount || 0
          } phrases`}
          onChange={(e: any) => {
            onSearchAction(e.target.value);
          }}
        />

        {data?.phrases[0] && (
          <Fragment>
            {data?.phrases.map((phrase) => {
              return <PhrasePreview key={phrase.id} phrase={phrase} />;
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

        {!isFetching && !data?.phrases[0] && (
          <ImageStates name="emptyBox" message="No phrases found" width={360} />
        )}
      </Flex>
    </Page>
  );
};

export default PhrasesPage;
