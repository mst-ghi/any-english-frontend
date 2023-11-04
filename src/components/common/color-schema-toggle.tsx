import { IconSun, IconMoon } from '@tabler/icons-react';
import {
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
} from '@mantine/core';

const ColorSchemeToggle = () => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', {
    getInitialValueInEffect: true,
  });

  return (
    <ActionIcon
      onClick={() =>
        setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')
      }
      h={38}
      w={38}
      variant="default"
      size="lg"
      aria-label="Toggle color scheme"
    >
      {computedColorScheme === 'light' ? <IconMoon /> : <IconSun />}
    </ActionIcon>
  );
};

export default ColorSchemeToggle;
