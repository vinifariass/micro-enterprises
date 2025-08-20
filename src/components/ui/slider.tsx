import * as React from "react";

export interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: number;
  onValueChange?: (v: number) => void;
}

export function Slider({ value, onValueChange, min = 0, max = 100, step = 1, className = "", ...rest }: SliderProps) {
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onValueChange?.(parseFloat((e.target as HTMLInputElement).value))}
      className={`h-2 w-full cursor-pointer appearance-none rounded bg-gray-200 accent-gray-900 ${className}`}
      {...rest}
    />
  );
}

export default Slider;
