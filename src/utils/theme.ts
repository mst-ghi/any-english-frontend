import { MantineThemeOverride } from '@mantine/core';

export const BaseTheme: Partial<MantineThemeOverride> = {
  defaultRadius: 'md',
  components: {
    Loader: {
      defaultProps: {
        type: 'bars',
      },
    },
    ActionIcon: {
      defaultProps: {
        variant: 'light',
      },
    },
  },
};
