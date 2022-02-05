import React, { useRef } from 'react';
import { Head } from '~/components/shared/Head';
import Button from '../shared/Button';
import Audio from '../shared/Audio';
import ThemePicker from '../shared/ThemePicker';
import Slider from '../shared/Slider';
import HomeBtn from '../shared/HomeBtn';
import DrumSetPicker from '../shared/DrumSetPicker';
import useStickyState from '~/hooks/useStickyState';

import { soundVariationsT } from '../../types';

function BeatsScreen() {
  const [soundVariation, setSoundVariation] = useStickyState('v0', 'soundVariation');

  const [pitch, setPitch] = useStickyState(1, 'pitch');
  const [volume, setVolume] = useStickyState(100, 'volume');
  const [speed, setSpeed] = useStickyState(15, 'speed');
  const numberOfSounds: number = 9;
  const numberOfBeats: number = 8;

  const arr: { [id: string]: boolean } = {};

  for (let i = 0; i < numberOfSounds; i++) {
    for (let j = 0; j < numberOfBeats; j++) {
      arr[`${i}-${j}`] = false;
    }
  }
  const [stickySettings, setStickySettings] = useStickyState(arr, 'stickySettings');

  console.log(arr);

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

  function handleVariationChange(value: soundVariationsT): void {
    setSoundVariation(value);
  }

  for (let i = 0; i < numberOfSounds; i++) {
    for (let j = 0; j < numberOfBeats; j++) {
      const isElementActive = stickySettings[`${i}-${j}`];
      const childRef = useRef<any>();
      buttons.push(
        <Button
          classnames="btn drum-pad h-12 p-0 overflow-hidden border-0 relative rounded-md shadow-lg border-2 border-gray-500/50"
          size="sm"
          id={`audio-${i}`}
          key={i + '-' + j}
          toggleState={true}
          isActived={isElementActive}
          onClick={() => {
            setStickySettings({
              ...stickySettings,
              [`${i}-${j}`]: true,
            });
            if (childRef?.current) {
              childRef.current.setIsActivated();
              childRef.current.playFromParent();
            }
          }}
        >
          {i}
          <Audio
            isActive={isElementActive}
            interval={numberOfBeats * (500 - speed * 10)} // max speed is 30
            delay={j}
            volume={volume}
            pitch={pitch}
            ref={childRef}
            src={`/audio/${soundVariation}/${sounds[i]}.wav`}
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
    <>
      <Head title="Beats machine" />

      <div
        className="min-h-screen container mx-auto flex flex-col flex-center justify-center items-center beats-screen"
        id="display"
      >
        <div className="header flex content-end items-center w-full justify-between pt-2 px-5 mb-10 gap-5 ">
          <HomeBtn />

          <ThemePicker />
        </div>

        <div className="drum-beats__layout mt-auto" id="drum-machine" style={columns}>
          {buttons}
        </div>
        <div className="drum-pad__layout mb-auto mt-10">
          <Slider title="Speed: " min={1} max={40} value={speed} step={1} onChange={(e) => changeSpeed(e)} />

          <Slider title="Pitch: " min={0.5} max={4} value={pitch} step={0.1} onChange={(e) => changePitch(e)} />

          <Slider title="Volume: " min={0} max={100} value={volume} step={1} onChange={(e) => changeVol(e)} />

          <DrumSetPicker
            wrapperClasses="three-cols mt-5"
            onChange={(val: soundVariationsT) => handleVariationChange(val)}
          ></DrumSetPicker>
          <div className="form-control -mr-16 mt-3">
            <Button> Export settings</Button>
          </div>
          <div className="form-control -ml-16 mt-3 col-start-3">
            <Button> Import settings</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default BeatsScreen;
