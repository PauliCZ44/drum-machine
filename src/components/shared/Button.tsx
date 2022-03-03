import React, { useState } from 'react';


import { size } from '../../types';
interface IButtonProps {
  toggleState?: boolean;
  isActived?: boolean;
  children: React.ReactNode;
  size?: size;
  classnames?: string;
  id?: string;
  onClick?(event: React.MouseEvent<HTMLButtonElement>): void;
}

export default function Button({
  children,
  size,
  classnames,
  id,
  toggleState,
  isActived = false,
  onClick,
}: IButtonProps) {
  const [isActive, setIsActive] = useState<boolean>(isActived);

  const classes: string = `btn ${isActive ? 'btn-primary' : ''}  btn-${size} ${classnames} `;

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
