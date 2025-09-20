
'use client'
import React, { useRef, useImperativeHandle, forwardRef } from "react";

export type AudioEngineHandle = {
  doPlay: (src: string) => void;
};

const AudioEngine = forwardRef<AudioEngineHandle>((_, ref) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useImperativeHandle(ref, () => ({
    doPlay: (src: string) => {
      const audio = audioRef.current;
      if (audio) {
        audio.src = src;
        audio.play();
      }
    },
  }));

  return <audio id="myAudio" ref={audioRef} />;
});

AudioEngine.displayName = "AudioEngine";
export default AudioEngine;