interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  onClick,
}: ButtonProps) {
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-slate-900 text-white hover:bg-slate-800",
    outline: "border border-blue-600 text-blue-600 hover:bg-blue-50",
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        rounded-lg
        font-medium
        transition-all
        duration-200
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}