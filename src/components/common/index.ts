import dynamic from 'next/dynamic';

export { default as Logo } from './logo';
export { default as FullLoader } from './full-loader';
export { default as PageLoader } from './page-loader';
export { default as ColorSchemeToggle } from './color-schema-toggle';
export { default as TextBlur } from './text-blur';
export { default as LottiePlayer } from './lottie-player';
export { default as SearchInput } from './search-input';
export { default as FadeTransition } from './fade-transition';
export { default as VoiceInput } from './voice-input';

const ImageStates = dynamic(() => import('./image-states'), {
  ssr: false,
});

export { ImageStates };
