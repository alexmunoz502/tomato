type QuickSelectProps<Type> = {
  value: Type;
  label?: string;
  onSelect: (value: Type) => void;
};

const QuickSelect = ({ value, label, onSelect }: QuickSelectProps<any>) => {
  return (
    <button
      onMouseDown={() => onSelect(value)}
      className={`
        hover:cursor-pointer border rounded p-2
        transition-transform duration-100 ease-in-out
        hover:scale-110 active:scale-75
        min-w-12
        `}
    >
      {label || value}
    </button>
  );
};

export default QuickSelect;
