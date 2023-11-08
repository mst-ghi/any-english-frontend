import {
  Button,
  Card,
  Divider,
  Flex,
  PasswordInput,
  Text,
  TextInput,
} from '@mantine/core';
import { IconAt, IconKey } from '@tabler/icons-react';
import { useAuth, useLoginForm } from '../hooks';
import Link from 'next/link';
import { useThemeStyle } from '@/hooks';
import { Logo } from '@/components';

type LoginFormValues = {
  email: string;
  password: string;
};

const LoginForm = ({
  redirectTo = '/',
  withBorder = true,
}: {
  redirectTo?: string;
  withBorder?: boolean;
}) => {
  const { isDesktop, isMobile } = useThemeStyle();
  const { loginForm } = useLoginForm();
  const { loading, loginRequest } = useAuth();

  const handleSubmit = async (values: LoginFormValues) => {
    const response = await loginRequest(values, redirectTo);
    if (response?.status === 400) {
      loginForm.setFieldError('email', response.message);
    }
  };

  return (
    <Card
      p={isDesktop ? 30 : 20}
      w={isMobile ? '100%' : 422}
      radius="md"
      withBorder={withBorder}
    >
      <Flex direction="column" gap="lg" align="center" mb={20}>
        <Logo height={40} />

        <Text size="xl" fw={600}>
          Login Form
        </Text>
      </Flex>

      <form onSubmit={loginForm.onSubmit(handleSubmit)}>
        <TextInput
          withAsterisk
          label="Email"
          placeholder="Email"
          leftSection={<IconAt size={14} />}
          autoComplete="new-username"
          {...loginForm.getInputProps('email')}
        />

        <PasswordInput
          withAsterisk
          mt={10}
          label="Password"
          placeholder="Password"
          leftSection={<IconKey size={14} />}
          autoComplete="new-password"
          {...loginForm.getInputProps('password')}
        />

        <Button
          type="submit"
          variant="light"
          mt={30}
          size="lg"
          fullWidth
          loading={loading}
          disabled={!loginForm.isValid()}
        >
          Login
        </Button>
      </form>

      <Divider label="OR" labelPosition="center" my="lg" />

      <Button component={Link} href="/auth/register" variant="subtle">
        Don't have an account? Create here
      </Button>
    </Card>
  );
};

export default LoginForm;
