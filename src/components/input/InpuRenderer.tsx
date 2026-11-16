import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface InputRendererProps {
  label: string;
  name: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  value?: string | number;
  error?: string;

  colSpan?: number;
  rowSpan?: number;

  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

export function InputRenderer({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
  disabled = false,
  readOnly = false,
  value = "",
  error,
  colSpan = 1,
  rowSpan = 1,
  onChange,
  onBlur,
}: InputRendererProps) {
  return (
    <div
      className="min-w-0 space-y-2"
      style={{
        gridColumn: `span ${colSpan}`,
        gridRow: `span ${rowSpan}`,
      }}
    >
      <Label htmlFor={name}>
        {label}
        {required && <span className="ml-1 text-destructive">*</span>}
      </Label>

      <Input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        value={value}
        aria-invalid={!!error}
        onChange={onChange}
        onBlur={onBlur}
      />

      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
