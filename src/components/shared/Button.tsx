import { useState } from 'react';
import React from 'react';
import useSound from 'use-sound';

declare type size = 'lg' | 'md' | 'sm' | 'xs';

interface IButtonProps {
  toggleState?: boolean;
  children: React.ReactNode;
  size?: size;
  classnames?: string;
  id?: string;
  onClick?(event: React.MouseEvent<HTMLButtonElement>): void;
}

export default function Button({ children, size, classnames, id, toggleState, onClick }: IButtonProps) {
  const [isActive, setIsActive] = useState<boolean>(false);

  let classes: string = `btn ${isActive ? 'btn-primary' : ''}  btn-${size} ${classnames} `;

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    onClick && onClick(e);
    setIsActive(!isActive);
  }

  if (toggleState) {
    return (
      <button className={classes} id={id} onClick={(e) => handleClick(e)}>
        {children}
      </button>
    );
  } else {
    return (
      <button className={classes} id={id} onClick={onClick}>
        {children}
      </button>
    );
  }
}
