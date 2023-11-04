'use client';

declare const window: any;

let SR;
let SS;

if (typeof window !== 'undefined') {
  const SRec = window.SpeechRecognition || window.webkitSpeechRecognition;
  SS = window.speechSynthesis;

  SR = new SRec();
  SR.continuous = true;
  SR.lang = 'en-US';
  SR.interimResults = false;
  SR.maxAlternatives = 1;
}

const Helpy = { SR, SS };

export default Helpy;
