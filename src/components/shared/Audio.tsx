import { useState, useEffect, forwardRef, useRef, useImperativeHandle } from 'react';
import React from 'react';
import useSound from 'use-sound';

import useKeyPress from '../../hooks/useKeyPress';
import useInterval from '../../hooks/useInterval';

interface AudioI {
  src: string;
  className?: string;
  id: string;
  binding: string;
  label?: string;
  onClick?(event: React.MouseEvent<HTMLAudioElement>): void;
  altBinding?: string;
  ref?: any;
  pitch: number;
  volume: number;
  interval: number;
  delay: number;
}

const Audio = forwardRef(
  ({ src, className, id, label, binding, altBinding = '', pitch, volume, interval = 0, delay }: AudioI, ref) => {
    const isPressed: boolean = useKeyPress(binding.toLowerCase());
    const isPressedAlt = useKeyPress(altBinding.toLowerCase());

    const [playbackSpeed, setPlaybackSpeed] = useState(interval / 3); // numberOfPads * 1000

    const [isActivated, setIsActivated] = useState(false);
    const [playInterval, setPlayInterval] = useState(playbackSpeed);

    function getAudioUrl(src: string) {
      return new URL(src, import.meta.url).href;
    }

    useInterval(() => {
      // Your custom logic here
      setTimeout(() => {
        console.log('interval is runnibg');
        isActivated && play();
      }, delay * (playbackSpeed / 8)); //playbackSpeed / number of pads
    }, playInterval);

    const [play] = useSound(getAudioUrl(src), { interrupt: true, playbackRate: pitch, volume: volume / 100 });

    useImperativeHandle(ref, () => ({
      playFromParent: () => play(),
      setIsActivated: () => setIsActivated(!isActivated),
    }));

    const pressed = isPressed || isPressedAlt;
    const [clicked, setClicked] = useState(false);

    if (pressed) {
      play();
    }
    //pressed && play();

    return (
      <>
        <audio
          className={'w-full h-full absolute flex justify-center items-center invisible ' + className}
          onMouseDown={() => {
            setClicked(true);
          }}
          onMouseUp={() => setClicked(false)}
          src={src}
          id={id}
        ></audio>
      </>
    );
  }
);

export default Audio;
