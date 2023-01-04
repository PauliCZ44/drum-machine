import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Head } from '~/components/shared/Head';
import Button from '~/components/shared/Button';
import Audio from '~/components/shared/Audio';
import ThemePicker from '~/components/shared/ThemePicker';
import Slider from '~/components/shared/Slider';
import HomeBtn from '~/components/shared/HomeBtn';
import DrumSetPicker from '~/components/shared/DrumSetPicker';
import { useCopyToClipboard, useStickyState, useThrottle } from '~/hooks/';

import { soundVariationsT } from '../../types';
import ModalButton from '~/components/shared/ModalButton';
import Alert from '~/components/shared/Alert';
import { useDebouncedValue } from '~/hooks/useDeboundedValue';
import ButtonsWrapper from '../shared/ButtonsWrapper';

let timeout4;
let timeout3;
let timeout2;
let timeout1;

const numberOfSounds: number = 9;
const numberOfPads: number = 12;

const generateSettingsObject = (numberOfSounds: number, numberOfPads: number) => {
  const settingsObject: { [id: string]: number } = {};
  for (let i = 0; i < numberOfSounds; i++) {
    for (let j = 0; j < numberOfPads; j++) {
      settingsObject[`${i}-${j}`] = 0;
    }
  }
  return settingsObject;
};

export const SOUNDS: string[] = ['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C'];

function BeatsScreen() {
  const textareaRef = useRef<HTMLTextAreaElement>(null!); // - element is always there; non-null assertion operator

  const [soundVariation, setSoundVariation] = useStickyState('v0', 'soundVariation');
  const [pitch, setPitchS] = useStickyState(1, 'pitch');
  const [setPitch] = useThrottle(setPitchS, 25);
  const [volume, setVolumeS] = useStickyState(100, 'volume');
  const [setVolume] = useThrottle(setVolumeS, 25);
  const [speed, setSpeedS] = useStickyState(15, 'speed');
  const [setSpeed] = useThrottle(setSpeedS, 25);

  const [debouncedSpeed] = useDebouncedValue(speed, 300);
  const [deboundedPitch] = useDebouncedValue(pitch, 300);
  const [debouncedVolume] = useDebouncedValue(volume, 300);

  const [showAlert1, setShowAlert1] = useState(false);
  const [showAlert2, setShowAlert2] = useState(false);
  const [showAlert3, setShowAlert3] = useState(false);
  const [showAlert4, setShowAlert4] = useState(false);
  const [animationName, setAnimationName] = useState('');
  const [genericAlertText, setGenericAlertText] = useState('');

  useEffect(() => {
    setAnimationName('moveRight');
    setGenericAlertText('🎸🤘 Please click or tap anywhere to allow sound 🎸🤘');
    showAlert(timeout4, setShowAlert4);
  }, []);

  const [, copy] = useCopyToClipboard();
  const [stickySettings, setStickySettings] = useStickyState(
    generateSettingsObject(numberOfPads, numberOfSounds),
    'stickySettings'
  );

  function changePitch(e: React.ChangeEvent<HTMLInputElement>): void {
    setPitch(+e.target.value);
  }

  function changeVol(e: React.ChangeEvent<HTMLInputElement>): void {
    setVolume(+e.target.value);
  }

  function changeSpeed(e: React.ChangeEvent<HTMLInputElement>): void {
    setAnimationName('');
    window.requestAnimationFrame(() => {
      setAnimationName('moveRight');
    });
    setSpeed(+e.target.value);
  }

  function handleVariationChange(value: soundVariationsT): void {
    setSoundVariation(value);
  }

  function copyToClipboard() {
    showAlert(timeout1, setShowAlert1);
    const filteredObj = {};
    for (const property in stickySettings) {
      if (stickySettings[property]) {
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
    const newSettings = {};
    for (const property in parsedData.els) {
      newSettings[property] = parsedData.els[property];
    }
    console.log(newSettings);
    setStickySettings({ ...stickySettings, ...newSettings });

    showAlert(timeout2, setShowAlert2);
    setTimeout(() => {
      location.reload();
    }, 3000);
  }

  const generateBtns = useMemo(() => {
    const buttons: React.ReactNode[] = [];
    console.log('generateBtns');
    for (let i = 0; i < numberOfSounds; i++) {
      for (let j = 0; j < numberOfPads; j++) {
        buttons.push(
          <ButtonsWrapper
            key={`${i}-${j}`}
            {...{
              numberOfSounds,
              numberOfPads,
              stickySettings,
              setStickySettings,
              debouncedSpeed,
              deboundedPitch,
              debouncedVolume,
              soundVariation,
              sounds: SOUNDS,
              i,
              j,
            }}
          />
        );
      }
    }
    return buttons;
  }, [numberOfSounds, numberOfPads, debouncedSpeed, deboundedPitch, debouncedVolume, soundVariation, stickySettings]);

  const animVars = {
    '--sliderAnim': `${numberOfPads * (500 - speed * 10)}ms`,
    '--sliderAnimName': animationName,
  } as React.CSSProperties;
  const columns = { '--columns': numberOfPads } as React.CSSProperties;
  return (
    <>
      <Head title="Beats machine" />

      <div
        style={animVars}
        className="min-h-screen container mx-auto flex flex-col flex-center justify-center items-center beats-screen overflow-x-hidden"
        id="display"
      >
        <div className="header flex content-end items-center w-full justify-between pt-2 px-5 mb-10 gap-5 ">
          <HomeBtn />

          <ThemePicker />
        </div>

        <div className="drum-beats__layout mt-auto relative" id="drum-machine" style={columns}>
          <div className="drum-beats__slider" />
          {generateBtns}
        </div>
        <div className="drum-pad__layout mb-auto mt-10">
          <Slider title="Speed: " min={1} max={40} value={speed} step={1} onChange={(e) => changeSpeed(e)} />

          <Slider title="Pitch: " min={0.5} max={4} value={pitch} step={0.1} onChange={(e) => changePitch(e)} />

          <Slider title="Volume: " min={0} max={100} value={volume} step={1} onChange={(e) => changeVol(e)} />

          <DrumSetPicker
            value={soundVariation}
            wrapperClasses="three-cols mt-5"
            onChange={(val: soundVariationsT) => handleVariationChange(val)}
          />
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
              />
              <div className="text-sm font-light opacity-80">
                With imdivort setting you can load other people&apos;s settings, or save your own settings to load them
                later. With this you can play share your settings with your friends!
              </div>
            </ModalButton>
          </div>
        </div>
        <div className="fixed flex-col inset-0 flex items-end justify-end z-10 pointer-events-none p-8 gap-4 overflow-hidden w-full h-full">
          {showAlert4 && <Alert>{genericAlertText}</Alert>}
          {showAlert3 && <Alert alertClass="alert-error">Error with data!</Alert>}
          {showAlert2 && (
            <Alert>
              Settings imported, please refresh the page to see the effect! <br /> (Auto refresh in 3 seconds)
            </Alert>
          )}
          {showAlert1 && <Alert>Text copied to clipboard</Alert>}
        </div>
      </div>
    </>
  );
}

export default BeatsScreen;
