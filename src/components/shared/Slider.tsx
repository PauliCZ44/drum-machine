import React from 'react';

interface ISlider {
  min: number;
  max: number;
  value: number;
  step: number;
  title: string;
  desc?: string;
  inputClassNames?: string;
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
}

export default function Slider({
  min = 0,
  max = 100,
  value = 50,
  step = 1,
  title,
  desc,
  inputClassNames,
  onChange,
}: ISlider) {
  return (
    <>
      <div className="shadow stats">
        <div className="stat">
          <div className="stat-title">{title}</div>
          <div className="stat-value">{value}</div>
          {title && <div className="stat-desc">{desc}</div>}
        </div>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        value={value}
        step={step}
        className={`range range-primary block my-auto p-5 two-cols ${  inputClassNames}`}
        onChange={(e) => onChange(e)}
      />
    </>
  );
}
