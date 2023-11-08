import { useThemeStyle } from '@/hooks';
import { Image, ImageProps } from '@mantine/core';

type LogoProps = Omit<ImageProps, 'src' | 'alt'> & {
  height?: number;
};

const Logo = (props: LogoProps) => {
  const { isLightTheme } = useThemeStyle();

  return (
    <Image
      src={isLightTheme ? '/logo-text.png' : '/logo-text-white.png'}
      alt="logo"
      {...props}
    />
  );
};

export default Logo;
