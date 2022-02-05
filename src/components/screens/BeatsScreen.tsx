import React, { useRef, useState } from 'react';
import { Head } from '~/components/shared/Head';
import Button from '../shared/Button';
import Audio from '../shared/Audio';
import ThemePicker from '../shared/ThemePicker';
import Slider from '../shared/Slider';
import HomeBtn from '../shared/HomeBtn';
import DrumSetPicker from '../shared/DrumSetPicker';
import useStickyState from '~/hooks/useStickyState';
import useCopyToClipboard from '~/hooks/useCopyToClipboard';

import { soundVariationsT } from '../../types';
import ModalButton from '../shared/ModalButton';
import Alert from '../shared/Alert';

function BeatsScreen() {
  const textareaRef = useRef<HTMLTextAreaElement>(null!); // - element is always there; non-null assertion operator

  const [soundVariation, setSoundVariation] = useStickyState('v0', 'soundVariation');
  const [pitch, setPitch] = useStickyState(1, 'pitch');
  const [volume, setVolume] = useStickyState(100, 'volume');
  const [speed, setSpeed] = useStickyState(15, 'speed');
  const [showAlert1, setShowAlert1] = useState(false);
  const [showAlert2, setShowAlert2] = useState(false);
  const [showAlert3, setShowAlert3] = useState(false);

  const numberOfSounds: number = 9;
  const numberOfBeats: number = 8;

  const arr: { [id: string]: number } = {};

  for (let i = 0; i < numberOfSounds; i++) {
    for (let j = 0; j < numberOfBeats; j++) {
      arr[`${i}-${j}`] = 0;
    }
  }
  const [value, copy] = useCopyToClipboard();
  const [stickySettings, setStickySettings] = useStickyState(arr, 'stickySettings');

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

  let timeout3;
  let timeout2;
  let timeout1;

  function copyToClipboard() {
    showAlert(timeout1, setShowAlert1);
    const filteredObj = {};
    for (const property in stickySettings) {
      if (!!stickySettings[property]) {
        filteredObj[property] = stickySettings[property];
      }
    }

    const settingsObj = {
      els: filteredObj,
      speed,
      pitch,
      soundVariation,
    };
    console.log(settingsObj);
    copy(JSON.stringify(settingsObj));
  }

  function showAlert(timeout, setShowAlert) {
    clearTimeout(timeout);
    setShowAlert(true);
    timeout = setTimeout(() => {
      setShowAlert(false);
    }, 4000);
  }

  function importSettings(data) {
    let parsedData;
    try {
      parsedData = JSON.parse(data);
    } catch (e) {
      showAlert(timeout3, setShowAlert3);
      throw new Error('Data are corrupted');
    }
    if (!parsedData.pitch || !parsedData.speed || !parsedData.soundVariation || !parsedData.els) {
      showAlert(timeout3, setShowAlert3);
      throw new Error('Data are corrupted');
    }
    setPitch(parsedData.pitch);
    setSpeed(parsedData.speed);
    setSoundVariation(parsedData.soundVariation);
    let newSettings = {};
    for (const property in parsedData.els) {
      newSettings[property] = parsedData.els[property];
    }
    console.log(newSettings);
    setStickySettings({ ...stickySettings, ...newSettings });

    showAlert(timeout2, setShowAlert2);
  }

  for (let i = 0; i < numberOfSounds; i++) {
    for (let j = 0; j < numberOfBeats; j++) {
      const isElementActive = !!stickySettings[`${i}-${j}`];
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
              [`${i}-${j}`]: stickySettings[`${i}-${j}`] ? 0 : 1,
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
        className="min-h-screen container mx-auto flex flex-col flex-center justify-center items-center beats-screen overflow-x-hidden"
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
            <Button onClick={copyToClipboard}> Export settings</Button>
          </div>
          <div className="form-control -ml-16 mt-3 col-start-3">
            <ModalButton buttonLabel="Import settings" onAccept={() => importSettings(textareaRef.current.value)}>
              <label className="label">
                <span className="label-text">Paste data here:</span>
              </label>
              <textarea
                className="textarea h-16 w-full textarea-bordered"
                placeholder='{"els":{...},"speed":...,"'
                ref={textareaRef}
              ></textarea>
            </ModalButton>
          </div>
        </div>
        <div className="absolute flex-col inset-0 flex items-end justify-end -z-10 p-8 gap-4 overflow-hidden">
          {showAlert3 && <Alert alertClass="alert-error">Error!</Alert>}
          {showAlert2 && <Alert>Settings imported, please refresh the page to see the effect!</Alert>}
          {showAlert1 && <Alert>Text copied to clipboard</Alert>}
        </div>
      </div>
    </>
  );
}

export default BeatsScreen;
