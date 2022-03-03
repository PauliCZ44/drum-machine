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
    }: AudioI,
    ref
  ) => {
    const isPressed: boolean = useKeyPress(binding.toLowerCase());
    const isPressedAlt = useKeyPress(altBinding.toLowerCase());
    const [isActivated, setIsActivated] = useState(isActive);

    useEffect(() => {
      const timer = setTimeout(() => {
        console.log('effect fired');

        isActivated && play();
      }, (delay * interval) / numberOfPads);
      return () => clearTimeout(timer);
    }, [interval]);

    if (interval !== 0) {
      useInterval(() => {
        setTimeout(() => {
          isActivated && play();
        }, (delay * interval) / numberOfPads); // playbackSpeed / number of pads
      }, interval);
    }

    const [play] = useSound(src, { interrupt: true, playbackRate: pitch, volume: volume / 100 });

    useImperativeHandle(ref, () => ({
      playFromParent: () => play(),
      setIsActivated: () => setIsActivated(!isActivated),
    }));

    const pressed = isPressed || isPressedAlt;

    if (pressed) {
      play();
    }

    return (
      <>
        <audio
          className={`w-full h-full absolute flex justify-center items-center invisible ${  className}`}
          src={src}
          id={id}
         />
      </>
    );
  }
);

Audio.displayName = "Audio";
export default Audio;
