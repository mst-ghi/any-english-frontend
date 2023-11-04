import { ActionIcon, TextInput, TextInputProps } from '@mantine/core';
import { IconArrowRight, IconSearch } from '@tabler/icons-react';
import { useDebouncedState } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type SearchInputProps = TextInputProps & {
  basePath?: string;
};

const SearchInput = ({
  placeholder = 'Search Word',
  w = '100%',
  size = 'xl',
  radius = 'xl',
  basePath = '/words',
}: SearchInputProps) => {
  const Router = useRouter();
  const [searchValue, setSearchValue] = useDebouncedState<string | undefined>(
    undefined,
    500,
  );

  return (
    <TextInput
      placeholder={placeholder}
      w={w}
      size={size}
      radius={radius}
      leftSection={<IconSearch />}
      onChange={(e) => {
        setSearchValue(e.target.value);
      }}
      onKeyUp={(e) => {
        if (e.key === 'Enter' && searchValue) {
          Router.push(`${basePath}?q=${searchValue}`);
        }
      }}
      rightSection={
        <ActionIcon
          size="xl"
          color="green"
          radius="xl"
          disabled={!searchValue}
          component={Link}
          href={`${basePath}?q=${searchValue}`}
        >
          <IconArrowRight />
        </ActionIcon>
      }
    />
  );
};

export default SearchInput;
