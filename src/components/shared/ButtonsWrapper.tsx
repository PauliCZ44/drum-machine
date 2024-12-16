import React, { useRef, memo } from 'react';
import Button from './Button';
import Audio from './Audio';
import { SOUNDS } from '../screens/BeatsScreen';

function ButtonsWrapper({
  soundVariation,
  numberOfSounds,
  numberOfPads,
  isElementActive,
  setStickySettings,
  debouncedSpeed,
  deboundedPitch,
  debouncedVolume,
  i,
  j,
}) {
  const childRef = useRef<any>(null);
  return (
    <Button
      classnames="btn drum-pad h-12 p-0 overflow-visible border-0 relative rounded-md shadow-lg border-2 border-gray-500/50"
      size="sm"
      id={`audio-${i}`}
      // key={`${i}-${j}`}
      toggleState
      isActived={isElementActive}
      onClick={() => {
        setStickySettings((prev) => ({
          ...prev,
          [`${i}-${j}`]: prev[`${i}-${j}`] ? 0 : 1,
        }));
        if (childRef?.current) {
          childRef.current.setIsActivated();
          childRef.current.playFromParent();
        }
      }}
    >
      {i}
      <Audio
        isActive={isElementActive}
        speed={debouncedSpeed}
        interval={numberOfPads * (500 - debouncedSpeed * 10)} // max speed is 30
        delay={j}
        volume={debouncedVolume}
        pitch={deboundedPitch}
        ref={childRef}
        src={`/audio/${soundVariation}/${SOUNDS[i]}.wav`}
        className="clip"
        id={SOUNDS[i]}
        binding={SOUNDS[i]}
        numberOfPads={numberOfPads}
      />
    </Button>
  );
}

export default memo(ButtonsWrapper);
