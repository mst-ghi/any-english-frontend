import { Text, TextProps } from '@mantine/core';

const TextBlur = ({
  value,
  blur,
  ...props
}: { value?: string; blur?: boolean; dir?: 'rtl' | 'ltr' } & TextProps) => {
  return (
    <Text
      style={{
        transition: 'text-shadow .3s, color: .3s',
        WebkitTransition: 'text-shadow .3s, color: .3s',
      }}
      className={[blur ? 'blur-text' : '', 'first-letter-uppercase'].join(' ')}
      {...props}
    >
      {value}
    </Text>
  );
};

export default TextBlur;
