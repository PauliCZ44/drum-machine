import React, { useState, useEffect, useRef } from 'react';
import { Head } from '~/components/shared/Head';
import Button from '../shared/Button';
import Audio from '../shared/Audio';
import ThemePicker from '../shared/ThemePicker';

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
    const childRef = useRef();
    buttons.push(
      <Button
        classnames="btn-primary  drum-pad h-24 p-0 overflow-hidden border-0"
        size="lg"
        id={`audio-${i}`}
        key={i}
        onClick={() => childRef.current.playFromParent()}
      >
        <Audio
          volume={volume}
          pitch={pitch}
          ref={childRef}
          src={`../../assets/audio/v0/${keyBindings[i]}.wav`}
          className="clip"
          label={key}
          id={keyBindings[i]}
          binding={keyBindings[i]}
          altBinding={numKeyBindings[i]}
        ></Audio>
      </Button>
    );
  }

  return (
    <div id="drum-machine">
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
            Switch to numpad
          </Button>
          <ThemePicker />
        </div>

        <div className="drum-pad__layout">
          {buttons}

          <div className="shadow stats">
            <div className="stat">
              <div className="stat-title">Play speed: </div>
              <div className="stat-value">{pitch}</div>
              <div className="stat-desc">(Or pitch value)</div>
            </div>
          </div>

          <input
            type="range"
            min="0.5"
            max="4.01"
            value={pitch}
            step="0.1"
            className="range range-primary block my-auto p-5 two-cols"
            onChange={(e) => changePitch(e)}
          />

          <div className="shadow stats">
            <div className="stat">
              <div className="stat-title">Volume: </div>
              <div className="stat-value">{volume}%</div>
              <div className="stat-desc"></div>
            </div>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            step="1"
            className="range range-primary block my-auto p-5 two-cols"
            onChange={(e) => changeVol(e)}
          />
        </div>
      </div>
    </div>
  );
}

export default DrumScreen;
