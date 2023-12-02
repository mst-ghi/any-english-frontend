import { Fragment, useEffect, useState } from 'react';
import {
  ActionIcon,
  Flex,
  Highlight,
  Loader,
  Stack,
  Text,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { Spotlight, spotlight } from '@mantine/spotlight';
import { useApp, useFetchSearch } from '@/hooks';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

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
                    <Highlight
                      component={Link}
                      key={`word-${word.id}`}
                      href={`/words?q=${word.word}`}
                      className="search-item"
                      highlight={query}
                      fw={500}
                      tt="capitalize"
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 4,
                      }}
                    >
                      {'# ' + word.word}
                    </Highlight>
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
                    <Highlight
                      component={Link}
                      key={`phrase-${phrase.id}`}
                      href={`/phrases?q=${phrase.phrase}`}
                      className="search-item"
                      fw={500}
                      tt="capitalize"
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 4,
                      }}
                      highlight={query}
                    >
                      {'# ' + phrase.phrase}
                    </Highlight>
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
                    <Highlight
                      component={Link}
                      key={`conversation-${conversation.id}`}
                      href={`/conversations?q=${conversation.title}`}
                      className="search-item"
                      fw={500}
                      tt="capitalize"
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 4,
                      }}
                      highlight={query}
                    >
                      {'# ' + conversation.title}
                    </Highlight>
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
