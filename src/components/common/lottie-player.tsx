import { Center, CenterProps } from '@mantine/core';
import { Player, IPlayerProps } from '@lottiefiles/react-lottie-player';

const Sources = {
  hi: 'https://assets9.lottiefiles.com/packages/lf20_7psw7qge.json',
  gift: 'https://assets6.lottiefiles.com/packages/lf20_EFnlfcxgVu.json',
  heart: 'https://assets9.lottiefiles.com/packages/lf20_Tj3A1GrIHf.json',
  rocket: 'https://assets9.lottiefiles.com/packages/lf20_TeX279uEBw.json',
  designer: 'https://assets2.lottiefiles.com/packages/lf20_w5hernhv.json',
  growth: 'https://assets1.lottiefiles.com/packages/lf20_wohcxlyr.json',
  'thinking-man': 'https://assets3.lottiefiles.com/packages/lf20_unlZRC.json',
  'rocket-launch':
    'https://assets7.lottiefiles.com/packages/lf20_GofK09iPAE.json',
  'happy-stars':
    'https://assets2.lottiefiles.com/packages/lf20_e6H1bPHepu.json',
  'chat-texting':
    'https://assets5.lottiefiles.com/packages/lf20_mKzfC9CEtg.json',
  'folio-missing':
    'https://assets6.lottiefiles.com/packages/lf20_I9N9FLLCqY.json',
  'transfer-files':
    'https://assets10.lottiefiles.com/packages/lf20_ABViugg18Y.json',
  'error-alert': 'https://assets1.lottiefiles.com/packages/lf20_aojvflyk.json',
  'finger-id': 'https://assets4.lottiefiles.com/packages/lf20_xbwo2u4a.json',
  waves: 'https://assets7.lottiefiles.com/packages/lf20_L3zgPE770f.json',
  financial: 'https://assets5.lottiefiles.com/packages/lf20_1ppv9m6x.json',
};

export type LottiePlayerProps = Partial<IPlayerProps> & {
  source?: keyof typeof Sources;
  height?: number;
  width?: number;
  wrapperProps?: Omit<CenterProps, 'children'>;
};

const LottiePlayer = ({
  source = 'gift',
  autoplay = true,
  speed = 1,
  loop = true,
  height = 300,
  width = 300,
  wrapperProps,
  ...props
}: LottiePlayerProps) => {
  return (
    <Center {...wrapperProps}>
      <Player
        autoplay={autoplay}
        speed={speed}
        loop={loop}
        src={Sources[source]}
        style={{ height: `${height}px`, width: `${width}px` }}
        {...props}
      />
    </Center>
  );
};

export default LottiePlayer;
