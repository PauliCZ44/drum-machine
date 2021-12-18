import React from 'react';

interface IGridProps {
  children: React.ReactNode;
}

export default function Grid({ children }: IGridProps) {
  return <div>{children}</div>;
}
