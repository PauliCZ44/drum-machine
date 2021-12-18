import { useState, useEffect } from 'react';
import React from 'react';
import useSound from 'use-sound';

interface AudioI {
  src: string;
  className?: string;
  id?: string;
  onClick?(event: React.MouseEvent<HTMLAudioElement>): void;
}

export default function Audio({ src, className, id }: AudioI) {
  function getAudioUrl(src: string) {
    return new URL(src, import.meta.url).href;
  }

  const [play] = useSound(getAudioUrl(src));

  return <audio src={src} className={className} id={id} onMouseEnter={play}></audio>;
}
