import { Fragment, useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { IconSearch } from '@tabler/icons-react';
import { Spotlight, spotlight } from '@mantine/spotlight';
import { useApp, useFetchSearch } from '@/hooks';
import Link from 'next/link';
import {
  ActionIcon,
  Box,
  Flex,
  Highlight,
  Loader,
  Stack,
  Text,
} from '@mantine/core';

const SearchActionHeader = () => {
  const { statsCount } = useApp();
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
        {statsCount && (
          <Flex
            direction="row"
            align="center"
            justify="space-between"
            px="sm"
            pt="md"
            mb={-6}
          >
            <Text size="xs" c="gray.7">
              #Words <strong>{statsCount?.wordsCount}</strong>
            </Text>

            <Text size="xs" c="gray.7">
              #Phrases <strong>{statsCount?.phrasesCount}</strong>
            </Text>

            <Text size="xs" c="gray.7">
              #Conversations <strong>{statsCount?.conversationsCount}</strong>
            </Text>
          </Flex>
        )}

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
                    <Box
                      key={`word-${word.id}`}
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 4,
                      }}
                    >
                      {'#'}
                      <Highlight
                        size="sm"
                        component={Link}
                        href={`/words?q=${word.word}`}
                        className="search-item"
                        highlight={query}
                        fw={500}
                      >
                        {word.word}
                      </Highlight>
                    </Box>
                  );
                })}
              </Flex>
            )}

            {data?.phrases[0] && (
              <Flex direction="column" gap={4}>
                <Text size="xs" c="gray.7">
                  Phrases
                </Text>
                {data.phrases.map((phrase) => {
                  return (
                    <Box
                      key={`phrase-${phrase.id}`}
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 4,
                      }}
                    >
                      {'#'}
                      <Highlight
                        size="sm"
                        component={Link}
                        href={`/phrases?q=${phrase.phrase}`}
                        className="search-item"
                        fw={500}
                        highlight={query}
                      >
                        {phrase.phrase}
                      </Highlight>
                    </Box>
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
                    <Box
                      key={`conversation-${conversation.id}`}
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 4,
                      }}
                    >
                      {'#'}
                      <Highlight
                        size="sm"
                        component={Link}
                        href={`/conversations?q=${conversation.title}`}
                        className="search-item"
                        fw={500}
                        highlight={query}
                      >
                        {conversation.title}
                      </Highlight>
                    </Box>
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
