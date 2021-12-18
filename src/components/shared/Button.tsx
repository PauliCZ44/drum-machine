import React from 'react'

declare type size = "lg" | "md" | "sm" | "xs";

interface IButtonProps {
  children: React.ReactNode,
  size?: size,
  classnames?: string,
  id?: string,
  onClick?(event: React.MouseEvent<HTMLButtonElement>): void;
}

export default function Button({children, size, classnames, id, onClick}: IButtonProps) {
  let classes: string = `btn btn-${size} ${classnames}`

  return (
    <button className={classes} id={id} onClick={onClick}>
      {children}
    </button>
  )
}
