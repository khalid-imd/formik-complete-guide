import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

interface TextareaRendererProps {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  rows?: number;
  value?: string;
  error?: string;
  colSpan?: number;
  rowSpan?: number;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
}

export function TextareaRenderer({
  label,
  name,
  placeholder,
  required = false,
  disabled = false,
  readOnly = false,
  rows = 4,
  value = "",
  error,
  colSpan = 1,
  rowSpan = 1,
  onChange,
  onBlur,
}: TextareaRendererProps) {
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

      <Textarea
        id={name}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        rows={rows}
        value={value}
        aria-invalid={!!error}
        onChange={onChange}
        onBlur={onBlur}
      />

      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
