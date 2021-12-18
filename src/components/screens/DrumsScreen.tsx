import { useState, useEffect } from 'react';
import { Head } from '~/components/shared/Head';
import Button from '../shared/Button';
import useSound from 'use-sound';

declare type keysVariationT = 'numPad' | 'letters';
declare type soundVariationsT = 'v1' | 'v2' | 'v3' | 'v0';

function DrumScreen() {
  const [keysVariation, setKeysVariation] = useState<keysVariationT>('letters');
  const [soundVariation, setSoundVariation] = useState<soundVariationsT>('v0');

  const numberOfButtons: number = 9;
  let buttons: JSX.Element[] = [];
  let keyBindings: string[] = ['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C'];
  let numKeyBindings: string[] = ['7', '8', '9', '4', '5', '6', '1', '2', '3'];
  let files: [];

  useEffect(() => {
    keyBindings.forEach((file, i) => {
      const sound = require(`@audio/v0/${file}.wav`);
      const [play] = useSound(sound);
    });
  }, []);

  if (keyBindings.length != numKeyBindings.length || numberOfButtons != numKeyBindings.length) {
    throw new Error('Bad parameters');
  }

  for (let i = 0; i < numberOfButtons; i++) {
    buttons.push(
      <Button classnames="drum-pad h-24" size="lg" id={`audio-${i}`} key={i}>
        {keysVariation === 'numPad' ? numKeyBindings[i] : keyBindings[i]}
        <audio src={`audio-${i}`} className="clip" id={keyBindings[i]}></audio>
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
        <Button
          onClick={() => (keysVariation === 'numPad' ? setKeysVariation('letters') : setKeysVariation('numPad'))}
          classnames="btn-xs mt-3 ml-auto"
        >
          Switch to numpad keyBindings
        </Button>

        <div className="drum-pad__layout">{buttons}</div>
      </div>
    </div>
  );
}

export default DrumScreen;
