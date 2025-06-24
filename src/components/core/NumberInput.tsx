"use client";
import { useState, useEffect, useRef } from "react";
import { PlusIcon, MinusIcon } from "@heroicons/react/16/solid";

type NumberInputProps = {
  label: string;
  description?: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
};

// const AnimatedValue = ({
//   value,
//   disableAnimation,
// }: {
//   value: any;
//   disableAnimation: boolean;
// }) => {
//   return (
//     <span
//       className={`

//     `}
//     >
//       {value}
//     </span>
//   );
// };

const NumberInput = ({
  label,
  description,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
}: NumberInputProps) => {
  const [animate, setAnimate] = useState(false);
  const isFirstRender = useRef(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "") onChange(min);
    const newValue = parseInt(event.target.value, 10);
    if (isNaN(newValue)) return;
    if (newValue < min) onChange(min);
    else if (newValue > max) onChange(max);
    else onChange(newValue);
  };

  const handleIncrement = () => {
    onChange(Math.min(max, value + step));
  };

  const handleDecrement = () => {
    onChange(Math.max(min, value - step));
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setAnimate(true);
    const timeout = setTimeout(() => setAnimate(false), 50);
    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <fieldset className="flex flex-col gap-2 items-start rounded w-fit">
      <label className="font-semibold">{label}</label>
      {description && (
        <span className="text-sm text-base-content-100/90">{description}</span>
      )}
      <div className="border rounded px-2 py-1 flex items-center">
        <button
          onClick={handleDecrement}
          className={`
            hover:bg-primary/50
            p-1 rounded hover:cursor-pointer
            transition-transform duration-100 ease-in-out
            hover:scale-110 active:scale-95
            `}
          type="button"
        >
          <MinusIcon className="size-5" />
        </button>
        <input
          type="number"
          value={value}
          onChange={handleChange}
          aria-label="Number Input"
          className={`
            w-16 text-center border-none focus:outline-none no-spinner
            transition-transform duration-50 ease-in-out
            ${animate ? "scale-110" : "scale-100"}
            `}
        />
        <button
          onClick={handleIncrement}
          className={`
            hover:bg-green-300/50
            p-1 rounded hover:cursor-pointer
            transition-transform duration-100 ease-in-out
            hover:scale-110 active:scale-95
            `}
          type="button"
        >
          <PlusIcon className="size-5" />
        </button>
      </div>
    </fieldset>
  );
};

export default NumberInput;
