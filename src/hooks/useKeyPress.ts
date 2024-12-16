// src: https://usehooks.com/page/2

import { useState, useEffect } from 'react';

export default function useKeyPress(targetKey: string, callback?: Function): boolean {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false);
  // If pressed key is our target key then set to true
  function downHandler({ key }): void {
    if (key === targetKey) {
      setKeyPressed(() => true);
      callback?.();
    }
  }
  // If released key is our target key then set to false
  const upHandler = ({ key }): void => {
    if (key === targetKey) {
      setKeyPressed(() => false);
      callback?.();
    }
  };
  // Add event listeners
  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount
  return keyPressed;
}
