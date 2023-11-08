'use client';

import { Page } from '@/components';
import { useAuth } from '@/components/auth';
import { Card, Title } from '@mantine/core';

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <Page title={user.fullname}>
      <Card>
        <Title mb="sm" order={2}>
          {user.fullname} Profile
        </Title>
      </Card>
    </Page>
  );
};

export default ProfilePage;
