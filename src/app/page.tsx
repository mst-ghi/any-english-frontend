'use client';
import { Logo, Page, SearchInput } from '@/components';
import { Center } from '@mantine/core';

const HomePage = () => {
  return (
    <Page title="Home">
      <Center mih={360} style={{ display: 'flex', flexDirection: 'column' }}>
        <Logo maw={400} mb="xl" />
        <SearchInput />
      </Center>
    </Page>
  );
};

export default HomePage;
