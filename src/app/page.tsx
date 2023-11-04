'use client';
import { Page, SearchInput } from '@/components';
import { Center, Image } from '@mantine/core';

const HomePage = () => {
  return (
    <Page title="Home">
      <Center mih={500} style={{ display: 'flex', flexDirection: 'column' }}>
        <Image src="/logo-text.png" alt="logo" maw={400} mb="xl" />
        <SearchInput />
      </Center>
    </Page>
  );
};

export default HomePage;
