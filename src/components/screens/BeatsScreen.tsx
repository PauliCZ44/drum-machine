import React, { ComponentProps, useEffect, useRef, useState } from 'react';
import Button from '~/components/shared/Button';
import DrumSetPicker from '~/components/shared/DrumSetPicker';
import { Head } from '~/components/shared/Head';
import HomeBtn from '~/components/shared/HomeBtn';
import Slider from '~/components/shared/Slider';
import ThemePicker from '~/components/shared/ThemePicker';
import { useCopyToClipboard, useStickyState, useThrottle } from '~/hooks/';

import Alert from '~/components/shared/Alert';
import ModalButton from '~/components/shared/ModalButton';
import { useDebouncedValue } from '~/hooks/useDeboundedValue';
import { soundVariationsT } from '../../types';
import ButtonsWrapper from '../shared/ButtonsWrapper';

const timeouts: Array<any> = [];

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

  const [showedAlertIds, setShowedAlertIds] = useState<number[]>([]);
  const [animationName, setAnimationName] = useState('');
  const [genericAlertText, setGenericAlertText] = useState('');

  useEffect(() => {
    setAnimationName('moveRight');
    setGenericAlertText('🎸🤘 Please click or tap anywhere to allow sound 🎸🤘');
    showAlert(4);
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
    showAlert(1);
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

  function showAlert(id: number) {
    setShowedAlertIds([...showedAlertIds, id]);
    clearTimeout(timeouts[id]);
    timeouts[id] = setTimeout(() => {
      setShowedAlertIds(showedAlertIds.filter((alertId) => alertId !== id));
    }, 4000);
  }

  function importSettings(data) {
    let parsedData;
    try {
      parsedData = JSON.parse(data);
    } catch (e) {
      showAlert(3);
      throw new Error('Data are corrupted');
    }
    if (!parsedData.pitch || !parsedData.speed || !parsedData.soundVariation || !parsedData.els) {
      showAlert(3);
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

    showAlert(2);
    setTimeout(() => {
      location.reload();
    }, 3000);
  }

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
          <AllTheButtons
            {...{
              numberOfSounds,
              numberOfPads,
              stickySettings,
              setStickySettings,
              debouncedSpeed,
              deboundedPitch,
              debouncedVolume,
              soundVariation,
            }}
          />
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
          {showedAlertIds.includes(4) && <Alert>{genericAlertText}</Alert>}
          {showedAlertIds.includes(3) && <Alert alertClass="alert-error">Error with data!</Alert>}
          {showedAlertIds.includes(2) && (
            <Alert>
              Settings imported, please refresh the page to see the effect! <br /> (Auto refresh in 3 seconds)
            </Alert>
          )}
          {showedAlertIds.includes(1) && <Alert>Text copied to clipboard</Alert>}
        </div>
      </div>
    </>
  );
}

const AllTheButtons = ({
  stickySettings,
  ...props
}: Omit<ComponentProps<typeof ButtonsWrapper>, 'i' | 'j' | 'isElementActive'> & { stickySettings: any }) => {
  const buttons: React.ReactNode[] = [];
  for (let i = 0; i < numberOfSounds; i++) {
    for (let j = 0; j < numberOfPads; j++) {
      buttons.push(
        <ButtonsWrapper
          key={`${i}-${j}`}
          {...props}
          isElementActive={!!stickySettings[`${i}-${j}`]}
          {...{
            sounds: SOUNDS,
            i,
            j,
          }}
        />
      );
    }
  }

  return <>{buttons} </>;
};

export default BeatsScreen;
