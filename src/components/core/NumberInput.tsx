"use client";
import { useState } from "react";
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

const NumberInput = ({
  label,
  description,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
}: NumberInputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    if (!isNaN(newValue) && newValue > 0) {
      onChange(newValue);
    }
    if (event.target.value === "") onChange(0);
  };

  const handleIncrement = () => {
    onChange(Math.min(max, value + step));
  };

  const handleDecrement = () => {
    onChange(Math.max(min, value - step));
  };

  return (
    <fieldset className="flex flex-col gap-2 items-start rounded w-fit">
      <label className="font-semibold">{label}</label>
      {description && (
        <span className="text-sm text-base-content-100/90">{description}</span>
      )}
      <div className="border rounded px-2 py-1 flex items-center">
        <button
          onClick={handleDecrement}
          className="hover:bg-primary/50 p-1 rounded"
          type="button"
        >
          <MinusIcon className="size-5" />
        </button>
        <input
          type="number"
          value={value}
          onChange={handleChange}
          aria-label="Number Input"
          className="w-16 text-center border-none focus:outline-none no-spinner"
        />
        <button
          onClick={handleIncrement}
          className="hover:bg-green-300/50 p-1 rounded"
          type="button"
        >
          <PlusIcon className="size-5" />
        </button>
      </div>
    </fieldset>
  );
};

export default NumberInput;
