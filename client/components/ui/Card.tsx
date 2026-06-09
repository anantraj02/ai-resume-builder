interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export default function Card({
  children,
  className = "",
  hoverable = false,
}: CardProps) {
  return (
    <div
      className={`
        bg-white
        border
        border-gray-200
        rounded-xl
        shadow-sm
        p-6
        ${
          hoverable
            ? "hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            : ""
        }
        ${className}
      `}
    >
      {children}
    </div>
  );
}