import { useState, useEffect, forwardRef, useRef, useImperativeHandle } from 'react';
import React from 'react';
import useSound from 'use-sound';

import useKeyPress from '../../hooks/useKeyPress';

interface AudioI {
  src: string;
  className?: string;
  id: string;
  binding: string;
  label: string;
  onClick?(event: React.MouseEvent<HTMLAudioElement>): void;
  altBinding: string;
  ref?: any;
  pitch: number;
  volume: number;
}

const Audio = forwardRef(({ src, className, id, label, binding, altBinding, pitch, volume }: AudioI, ref) => {
  const isPressed: boolean = useKeyPress(binding.toLowerCase());
  const isPressedAlt: boolean = useKeyPress(altBinding.toLowerCase());

  function getAudioUrl(src: string) {
    return new URL(src, import.meta.url).href;
  }

  const [play] = useSound(getAudioUrl(src), { interrupt: true, playbackRate: pitch, volume: volume / 100 });

  useImperativeHandle(ref, () => ({
    playFromParent: () => play(),
  }));

  const pressed = isPressed || isPressedAlt;
  const [clicked, setClicked] = useState(false);

  if (pressed) {
    console.log('pressed');
    console.log(play, '\n aaa \n', play());
    play();
  }

  //pressed && play();

  const classes = pressed || clicked ? 'bg-primary opacity-25' : '';

  return (
    <div
      className={'w-full h-full flex justify-center items-center ' + classes}
      onMouseDown={() => {
        setClicked(true);
      }}
      onMouseUp={() => setClicked(false)}
    >
      <audio src={src} className={className} id={id}></audio>
      {label}
    </div>
  );
});

export default Audio;
