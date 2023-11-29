'use client';
import {
  ConversationPreview,
  FadeTransition,
  ImageStates,
  Page,
  PhrasePreview,
  WordCard,
} from '@/components';
import { useApp, useFetchSearch } from '@/hooks';
import { Box, Button, Center, Divider, Flex, TextInput } from '@mantine/core';
import { useDebouncedState } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Fragment, useEffect } from 'react';

const SearchPage = () => {
  const Router = useRouter();
  const searchParams = useSearchParams();

  const [searchValue, setSearchValue] = useDebouncedState(
    searchParams.get('q') || '',
    500,
  );

  const { data, isFetching } = useFetchSearch({
    search: searchValue,
    take: 3,
  });

  const onSearchAction = (str: string) => {
    setSearchValue(str);
  };

  useEffect(() => {
    if (searchValue) {
      Router.push(`/search?q=${searchValue}`);
    } else {
      Router.push(`/search`);
    }
  }, [searchValue]);

  return (
    <Page title="Search" loading={isFetching}>
      <Flex direction="column" gap="lg">
        <TextInput
          mb="lg"
          size="lg"
          radius="md"
          defaultValue={searchValue}
          leftSection={<IconSearch />}
          placeholder={`Type to search`}
          onChange={(e) => {
            onSearchAction(e.target.value);
          }}
        />

        <FadeTransition mounted={!isFetching && Boolean(data?.words[0])}>
          <Flex direction="column" gap="sm">
            <Divider
              label="The result of words"
              labelPosition="left"
              color={data?.words[0] ? 'blue' : undefined}
              styles={{
                label: {
                  fontSize: 18,
                },
              }}
            />

            {data?.words.map((word) => {
              return <WordCard key={word.id} word={word} />;
            })}

            <Center>
              <Button
                variant="subtle"
                component={Link}
                leftSection={<IconSearch />}
                href={
                  searchValue && data?.words[0]
                    ? `/words?q=${searchValue}`
                    : '/words'
                }
              >
                Find More Words
              </Button>
            </Center>
          </Flex>
        </FadeTransition>

        <FadeTransition mounted={!isFetching && Boolean(data?.phrases[0])}>
          <Flex direction="column" gap="sm">
            <Divider
              label="The result of phrases"
              labelPosition="left"
              color={data?.phrases[0] ? 'blue' : undefined}
              styles={{
                label: {
                  fontSize: 18,
                },
              }}
            />

            {data?.phrases.map((phrase) => {
              return <PhrasePreview key={phrase.id} phrase={phrase} />;
            })}

            <Center>
              <Button
                variant="subtle"
                component={Link}
                leftSection={<IconSearch />}
                href={
                  searchValue && data?.phrases[0]
                    ? `/phrases?q=${searchValue}`
                    : '/phrases'
                }
              >
                Find More Phrases
              </Button>
            </Center>
          </Flex>
        </FadeTransition>

        <FadeTransition
          mounted={!isFetching && Boolean(data?.conversations[0])}
        >
          <Flex direction="column" gap="sm">
            <Divider
              label="The result of conversations"
              labelPosition="left"
              color={data?.conversations[0] ? 'blue' : undefined}
              styles={{
                label: {
                  fontSize: 18,
                },
              }}
            />
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

            <Center>
              <Button
                variant="subtle"
                component={Link}
                leftSection={<IconSearch />}
                href={
                  searchValue && data?.conversations[0]
                    ? `/conversations?q=${searchValue}`
                    : '/conversations'
                }
              >
                Find More Conversations
              </Button>
            </Center>
          </Flex>
        </FadeTransition>
      </Flex>
    </Page>
  );
};

export default SearchPage;
