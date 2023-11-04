'use client';

import { Page } from '@/components';
import { useAuth } from '@/components/auth';
import { Center } from '@mantine/core';

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <Page title={user.fullname}>
      <Center mih={500} style={{ display: 'flex', flexDirection: 'column' }}>
        <h1>{user.fullname}</h1>
      </Center>
    </Page>
  );
};

export default ProfilePage;
