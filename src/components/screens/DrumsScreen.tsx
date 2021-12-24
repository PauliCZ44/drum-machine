import React, { useState, useEffect, useRef } from 'react';
import { Head } from '~/components/shared/Head';
import Button from '../shared/Button';
import Audio from '../shared/Audio';
import ThemePicker from '../shared/ThemePicker';
import Slider from '../shared/Slider';
import useKeyPress from '../../hooks/useKeyPress';

declare type keysVariationT = 'numPad' | 'letters';
declare type soundVariationsT = 'v1' | 'v2' | 'v3' | 'v0';

function DrumScreen() {
  const [keysVariation, setKeysVariation] = useState<keysVariationT>('letters');
  const [soundVariation, setSoundVariation] = useState<soundVariationsT>('v0');

  const [pitch, setPitch] = useState(1);
  const [volume, setVolume] = useState(100);

  const numberOfButtons: number = 9;
  let buttons: JSX.Element[] = [];
  let keyBindings: string[] = ['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C'];
  let numKeyBindings: string[] = ['7', '8', '9', '4', '5', '6', '1', '2', '3'];

  function changePitch(e): void {
    setPitch(e.target.value);
  }

  function changeVol(e): void {
    setVolume(e.target.value);
  }

  if (keyBindings.length != numKeyBindings.length || numberOfButtons != numKeyBindings.length) {
    throw new Error('Bad parameters');
  }

  for (let i = 0; i < numberOfButtons; i++) {
    const key = keysVariation === 'numPad' ? numKeyBindings[i] : keyBindings[i];
    const childRef = useRef<any>();

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
          src={`../../assets/audio/v0/${keyBindings[i]}.wav`}
          className="clip"
          id={keyBindings[i]}
          binding={keyBindings[i]}
          altBinding={numKeyBindings[i]}
        ></Audio>
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
        <div className="header flex content-end items-center w-full pt-2 px-5 justify-end gap-5 ">
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
        </div>
      </div>
    </div>
  );
}

export default DrumScreen;
