import { Fragment, useEffect, useState } from 'react';
import { ActionIcon, Flex, Loader, Stack, Text } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { Spotlight, spotlight } from '@mantine/spotlight';
import { useFetchSearch } from '@/hooks';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

const SearchActionHeader = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState('');

  const { data, isFetching } = useFetchSearch({
    search: query,
    take: 3,
  });

  useEffect(() => {
    spotlight.close();
  }, [pathname, searchParams.get('q')]);

  return (
    <Fragment>
      <ActionIcon onClick={spotlight.open} size={38} radius="md">
        <IconSearch size={28} />
      </ActionIcon>

      <Spotlight.Root query={query} onQueryChange={setQuery}>
        <Spotlight.Search
          mx="xs"
          mt="xs"
          placeholder="Search for the text you want..."
          leftSection={
            isFetching ? <Loader size="sm" /> : <IconSearch stroke={1.5} />
          }
        />
        <Spotlight.ActionsList>
          <Stack px="lg" pb="lg" pt="sm">
            {data?.words[0] && (
              <Flex direction="column" gap={4}>
                <Text size="xs" c="gray.7">
                  Words
                </Text>
                {data.words.map((word) => {
                  return (
                    <Link
                      key={`word-${word.id}`}
                      href={`/words?q=${word.word}`}
                      className="search-item"
                    >
                      <Text fw={500} tt="capitalize">
                        # {word.word}
                      </Text>
                    </Link>
                  );
                })}
              </Flex>
            )}

            {data?.words[0] && (
              <Flex direction="column" gap={4}>
                <Text size="xs" c="gray.7">
                  Phrases
                </Text>
                {data.phrases.map((phrase) => {
                  return (
                    <Link
                      key={`phrase-${phrase.id}`}
                      href={`/phrases?q=${phrase.phrase}`}
                      className="search-item"
                    >
                      <Text fw={500} tt="capitalize">
                        # {phrase.phrase}
                      </Text>
                    </Link>
                  );
                })}
              </Flex>
            )}

            {data?.conversations[0] && (
              <Flex direction="column" gap={4}>
                <Text size="xs" c="gray.7">
                  Conversations
                </Text>
                {data.conversations.map((conversation) => {
                  return (
                    <Link
                      key={`conversation-${conversation.id}`}
                      href={`/conversations?q=${conversation.title}`}
                      className="search-item"
                    >
                      <Text fw={500} tt="capitalize">
                        # {conversation.title}
                      </Text>
                    </Link>
                  );
                })}
              </Flex>
            )}
          </Stack>
        </Spotlight.ActionsList>
      </Spotlight.Root>
    </Fragment>
  );
};

export default SearchActionHeader;
