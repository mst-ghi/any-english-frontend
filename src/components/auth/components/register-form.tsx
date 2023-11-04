import { IconAt, IconKey } from '@tabler/icons-react';
import { useAuth, useRegisterForm } from '../hooks';
import {
  Button,
  Card,
  Divider,
  Flex,
  Image,
  PasswordInput,
  Text,
  TextInput,
} from '@mantine/core';
import Link from 'next/link';
import { useThemeStyle } from '@/hooks';

type RegisterFormValues = {
  email: string;
  fullname: string;
  password: string;
};

const RegisterForm = ({
  redirectTo = '/',
  withBorder = true,
}: {
  redirectTo?: string;
  withBorder?: boolean;
}) => {
  const { isDesktop, isMobile } = useThemeStyle();
  const { registerForm } = useRegisterForm();
  const { loading, registerRequest } = useAuth();

  const handleSubmit = async (values: RegisterFormValues) => {
    const response = await registerRequest(values, redirectTo);
    if (response?.status === 422) {
      registerForm.setErrors(response.errors);
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
        <Image src="/logo-text.png" alt="logo" height={40} />

        <Text size="xl" fw={600}>
          Register Form
        </Text>
      </Flex>

      <form onSubmit={registerForm.onSubmit(handleSubmit)}>
        <TextInput
          withAsterisk
          label="Email"
          placeholder="Email"
          leftSection={<IconAt size={14} />}
          autoComplete="new-email"
          {...registerForm.getInputProps('email')}
        />

        <TextInput
          withAsterisk
          mt={10}
          label="Fullname"
          placeholder="Fullname"
          leftSection={<IconAt size={14} />}
          autoComplete="new-fullname"
          {...registerForm.getInputProps('fullname')}
        />

        <PasswordInput
          withAsterisk
          mt={10}
          label="Password"
          placeholder="Password"
          leftSection={<IconKey size={14} />}
          autoComplete="new-password"
          {...registerForm.getInputProps('password')}
        />

        <Button
          type="submit"
          variant="light"
          mt={30}
          size="lg"
          fullWidth
          loading={loading}
          disabled={!registerForm.isValid()}
        >
          Register
        </Button>
      </form>

      <Divider label="OR" labelPosition="center" my="lg" />

      <Button component={Link} href="/auth/login" variant="subtle">
        Go to login form
      </Button>
    </Card>
  );
};

export default RegisterForm;
