import React, { useState, useEffect, useRef, ReactChildren, ReactComponentElement } from 'react';
import { Head } from '~/components/shared/Head';
import Button from '../shared/Button';
import Audio from '../shared/Audio';
import ThemePicker from '../shared/ThemePicker';
import Slider from '../shared/Slider';
import HomeBtn from '../shared/HomeBtn';

declare type soundVariationsT = 'v1' | 'v2' | 'v3' | 'v0';

function BeatsScreen() {
  const [soundVariation, setSoundVariation] = useState<soundVariationsT>('v0');

  const [pitch, setPitch] = useState(1);
  const [volume, setVolume] = useState(100);
  const [speed, setSpeed] = useState(10);

  const numberOfSounds: number = 9;
  const numberOfBeats: number = 8;
  const numbersOfPads: number = numberOfSounds * numberOfBeats;

  let buttons: JSX.Element[] = [];
  let sounds: string[] = ['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C'];

  function changePitch(e: React.ChangeEvent<HTMLInputElement>): void {
    setPitch(+e.target.value);
  }

  function changeVol(e: React.ChangeEvent<HTMLInputElement>): void {
    setVolume(+e.target.value);
  }

  function changeSpeed(e: React.ChangeEvent<HTMLInputElement>): void {
    setSpeed(+e.target.value);
  }

  for (let i = 0; i < numberOfSounds; i++) {
    for (let j = 0; j < numberOfBeats; j++) {
      const childRef = useRef<any>();
      buttons.push(
        <Button
          classnames="btn drum-pad h-12 p-0 overflow-hidden border-0 relative rounded-md shadow-lg border-2 border-gray-500/50"
          size="sm"
          id={`audio-${i}`}
          key={i + '-' + j}
          toggleState={true}
          onClick={() => {
            if (childRef?.current) {
              childRef.current.setIsActivated();
              childRef.current.playFromParent();
            }
          }}
        >
          {i}
          <Audio
            interval={numberOfBeats * 100 * speed}
            delay={j}
            volume={volume}
            pitch={pitch}
            ref={childRef}
            src={`/audio/v0/${sounds[i]}.wav`}
            className="clip"
            id={sounds[i]}
            binding={sounds[i]}
          ></Audio>
        </Button>
      );
    }
  }

  let columns = { '--columns': numberOfBeats } as React.CSSProperties;

  return (
    <div>
      <Head title="Beats machine" />

      <div
        className="min-h-screen container mx-auto flex flex-col flex-center justify-center items-center beats-screen"
        id="display"
      >
        <div className="header flex content-end items-center w-full justify-between pt-2 px-5 gap-5 ">
          <HomeBtn />

          <ThemePicker />
        </div>

        <div className="drum-beats__layout mt-auto" id="drum-machine" style={columns}>
          {buttons}
        </div>
        <div className="drum-pad__layout mb-auto mt-10">
          <Slider title="Speed: " min={1} max={30} value={speed} step={1} onChange={(e) => changeSpeed(e)} />

          <Slider title="Pitch: " min={0.5} max={4} value={pitch} step={0.1} onChange={(e) => changePitch(e)} />

          <Slider title="Volume: " min={0} max={100} value={volume} step={1} onChange={(e) => changeVol(e)} />
        </div>
      </div>
    </div>
  );
}

export default BeatsScreen;
