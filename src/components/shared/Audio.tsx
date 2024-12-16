import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';

import useSound from 'use-sound';

import { useKeyPress, useInterval } from '~/hooks/';
interface AudioI {
  src: string;
  className?: string;
  id: string;
  binding: string;
  onClick?(event: React.MouseEvent<HTMLAudioElement>): void;
  altBinding?: string;
  ref?: any;
  pitch: number;
  volume: number;
  interval?: number;
  delay?: number;
  isActive?: boolean;
  numberOfPads: number;
  speed?: number;
}

const Audio = forwardRef(
  (
    {
      src,
      className,
      id,
      binding,
      altBinding = '',
      pitch,
      volume,
      interval = 0,
      delay = 250,
      isActive = false,
      numberOfPads,
      speed = 15,
    }: AudioI,
    ref
  ) => {
    const [play] = useSound(src, { interrupt: true, playbackRate: pitch, volume: volume / 100 });
    useKeyPress(binding.toLowerCase(), play);
    useKeyPress(altBinding.toLowerCase(), play);
    const [isActivated, setIsActivated] = useState(isActive);
    const [scale, setScale] = useState('scale-100 opacity-10');
    const [transSpeed] = useState(325 - speed * 5);

    const playbackSpeed = (delay * interval) / numberOfPads;
    useEffect(() => {
      const timer = setTimeout(() => {
        isActivated && play();
      }, playbackSpeed);
      return () => clearTimeout(timer);
    }, [interval]);

    if (interval !== 0) {
      useInterval(() => {
        setTimeout(() => {
          if (isActivated) {
            play();
            setScale('scale-125 opacity-100');
            setTimeout(() => {
              setScale('scale-110 opacity-75');
            }, transSpeed);
          }
        }, playbackSpeed);
      }, interval);
    }

    useImperativeHandle(ref, () => ({
      playFromParent: () => play(),
      setIsActivated: () => setIsActivated(!isActivated),
    }));

    return (
      <>
        <audio
          className={`w-full h-full absolute flex justify-center items-center invisible ${className}`}
          src={src}
          id={id}
        />
        <div
          style={{ transitionDuration: `${transSpeed}ms` }}
          className={`transition-transform absolute -inset-0 rounded-md border-secondary border-4 -z-10  ${scale}`}
        />
      </>
    );
  }
);

Audio.displayName = 'Audio';
export default Audio;
