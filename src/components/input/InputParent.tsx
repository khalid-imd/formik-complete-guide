interface InputParentProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}

export function InputParent({
  children,
  columns = 2,
  className = "",
}: InputParentProps) {
  const columnClass = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={`grid ${columnClass[columns]} gap-5 ${className}`}>
      {children}
    </div>
  );
}
