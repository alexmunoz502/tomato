type ButtonProps = {
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  className,
  onClick,
  disabled = false,
  type = "button",
}) => {
  const baseClasses = "border rounded hover:cursor-pointer";

  const variantClasses = {
    primary:
      "bg-primary hover:bg-primary-700 text-white border border-base-content-300",
    secondary: "",
    outline: "border border-base-content-300 text-base-content-300",
  };

  const sizeClasses = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base min-w-24",
    lg: "px-5 py-3 text-lg",
  };

  return (
    <button
      type={type}
      className={
        className +
        ` ${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`
      }
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
