'use client';

import { useRouter } from 'next/navigation';
import { useApp } from '.';
import { useEffect } from 'react';
import Helpy from '@/utils/helpy';

const useHelpy = () => {
  const { SR, SS } = Helpy;
  const Router = useRouter();

  const { helpy, setHelpy } = useApp();

  const helpyOn = () => {
    setHelpy({ ...helpy, active: true });
  };

  const helpyOff = () => {
    setHelpy({ ...helpy, active: false });
  };

  const speak = (str: string) => {
    const SSU = new SpeechSynthesisUtterance(str);
    SS.speak(SSU);
  };

  SR.onresult = ({ results }) => {
    const command: string = results[results.length - 1][0].transcript;

    if (command) {
      console.info('Your command >>', command);

      // navigation command
      if (command.includes('go to')) {
        // home page command
        if (command.includes('home')) {
          Router.push('/');
          speak('You are in home page');
        }

        // new word page command
        else if (command.includes('new')) {
          Router.push('/new-word');
          speak('You are in new word page, new word form is ready');
        }

        // words page command
        else if (command.includes('words')) {
          Router.push('/words');
          speak('You are in words page');
        }

        // phrases page command
        else if (command.includes('phrase')) {
          Router.push('/phrases');
          speak('You are in phrases page');
        }
      }

      // turn off command
      else if (command.includes('turn off')) {
        helpyOff();
      }

      // thanks command
      else if (command.includes('thanks') || command.includes('thank you')) {
        speak('Your welcome');
      }

      // not found command
      else {
        speak('Your voice command cannot be processed');
      }
    }
  };

  useEffect(() => {
    if (helpy.active) {
      SR.start();
    } else {
      SR.abort();
    }
  }, [helpy.active]);

  return {
    ...helpy,
    helpyOn,
    helpyOff,
    speak,
  };
};

export default useHelpy;
