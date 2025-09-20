import { useRef, useEffect, RefObject } from "react";

export function useAudioGraph(audioRef: RefObject<HTMLAudioElement>) {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const bassRef = useRef<BiquadFilterNode | null>(null);
  const trebleRef = useRef<BiquadFilterNode | null>(null);

  useEffect(() => {
    const audioEl = audioRef.current;
    if (!audioEl) return;

    const audioCtx = new AudioContext();
    const source = audioCtx.createMediaElementSource(audioEl);

    const bassFilter = audioCtx.createBiquadFilter();
    bassFilter.type = "lowshelf";
    bassFilter.frequency.value = 200;
    bassFilter.gain.value = 0;

    const trebleFilter = audioCtx.createBiquadFilter();
    trebleFilter.type = "highshelf";
    trebleFilter.frequency.value = 3000;
    trebleFilter.gain.value = 0;

    source.connect(bassFilter).connect(trebleFilter).connect(audioCtx.destination);

    audioCtxRef.current = audioCtx;
    sourceRef.current = source;
    bassRef.current = bassFilter;
    trebleRef.current = trebleFilter;

    return () => {
      source.disconnect();
      bassFilter.disconnect();
      trebleFilter.disconnect();
      audioCtx.close();
    };
  }, [audioRef]);

  const setVolume = (volume: number): void => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  };

  const setBass = (gain: number): void => {
    bassRef.current?.gain.setValueAtTime(gain, audioCtxRef.current!.currentTime);
  };

  const setTreble = (gain: number): void => {
    trebleRef.current?.gain.setValueAtTime(gain, audioCtxRef.current!.currentTime);
  };

  return { setVolume, setBass, setTreble };
}