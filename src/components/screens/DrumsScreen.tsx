import React, { useState, useRef } from 'react';
import { Head } from '~/components/shared/Head';
import Button from '~/components/shared/Button';
import Audio from '~/components/shared/Audio';
import ThemePicker from '~/components/shared/ThemePicker';
import Slider from '~/components/shared/Slider';
import DrumSetPicker from '~/components/shared/DrumSetPicker';
import HomeBtn from '~/components/shared/HomeBtn';

import { useKeyPress } from '~/hooks/';

import { keysVariationT, soundVariationsT } from '../../types';

function DrumScreen() {
  const [keysVariation, setKeysVariation] = useState<keysVariationT>('letters');
  const [soundVariation, setSoundVariation] = useState<soundVariationsT>('v0');

  const [pitch, setPitch] = useState(1);
  const [volume, setVolume] = useState(100);

  const numberOfButtons: number = 9;
  const buttons: React.ReactNode[] = [];
  const keyBindings: string[] = ['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C'];
  const numKeyBindings: string[] = ['7', '8', '9', '4', '5', '6', '1', '2', '3'];

  function changePitch(e): void {
    setPitch(e.target.value);
  }

  function changeVol(e): void {
    setVolume(e.target.value);
  }

  function handleVariationChange(value: soundVariationsT): void {
    setSoundVariation(value);
  }

  if (keyBindings.length !== numKeyBindings.length || numberOfButtons !== numKeyBindings.length) {
    throw new Error('Bad parameters');
  }

  for (let i = 0; i < numberOfButtons; i++) {
    const key = keysVariation === 'numPad' ? numKeyBindings[i] : keyBindings[i];
    const childRef = useRef<any>(null);

    const isPressed: boolean = useKeyPress(key.toLowerCase());
    const isPressedAlt: boolean = useKeyPress(key.toLowerCase());

    const pressed = isPressed || isPressedAlt;

    buttons.push(
      <Button
        classnames={`btn-primary drum-pad h-24 p-0 overflow-hidden border-0 relative ${
          pressed ? ' btn-active' : ''
        }  ${pressed}`}
        size="lg"
        id={`audio-${i}`}
        key={i}
        onClick={() => childRef?.current?.playFromParent()}
      >
        {key}
        <Audio
          volume={volume}
          pitch={pitch}
          ref={childRef}
          src={`/audio/${soundVariation}/${keyBindings[i]}.wav`}
          className="clip"
          id={keyBindings[i]}
          binding={keyBindings[i]}
          altBinding={numKeyBindings[i]}
          numberOfPads={0}
        />
      </Button>
    );
  }

  return (
    <div>
      <Head title="Drum machine" />

      <div
        className="min-h-screen container mx-auto flex flex-col flex-center justify-center items-center"
        id="display"
      >
        <div className="header flex content-end items-center w-full pt-2 px-5 justify-center gap-5 ">
          <HomeBtn />
          <Button
            onClick={() => (keysVariation === 'numPad' ? setKeysVariation('letters') : setKeysVariation('numPad'))}
            classnames="btn-sm btn-outline"
          >
            {keysVariation === 'numPad' ? 'Switch to letters' : 'Switch to numpad'}
          </Button>
          <ThemePicker />
        </div>

        <div className="drum-pad__layout mt-auto" id="drum-machine">
          {buttons}
        </div>
        <div className="drum-pad__layout mb-auto mt-10">
          <Slider
            title="Play speed: "
            desc="(Or pitch value)"
            min={0.5}
            max={4}
            value={pitch}
            step={0.1}
            onChange={(e) => changePitch(e)}
          />

          <Slider title="Volume: " min={0} max={100} value={volume} step={1} onChange={(e) => changeVol(e)} />

          <DrumSetPicker
            value={soundVariation}
            wrapperClasses="three-cols mt-5"
            onChange={(val: soundVariationsT) => handleVariationChange(val)}
          />
        </div>
      </div>
    </div>
  );
}

export default DrumScreen;
