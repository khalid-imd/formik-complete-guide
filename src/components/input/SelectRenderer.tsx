import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectRendererProps {
  label: string;
  name: string;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  value?: string;
  error?: string;
  colSpan?: number;
  rowSpan?: number;
  onChange?: (value: string) => void;
  onBlur?: React.FocusEventHandler<HTMLButtonElement>;
}

export function SelectRenderer({
  label,
  name,
  options,
  placeholder = "Select an option",
  required = false,
  disabled = false,
  value = "",
  error,
  colSpan = 1,
  rowSpan = 1,
  onChange,
  onBlur,
}: SelectRendererProps) {
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

      <Select
        value={value}
        onValueChange={(value) => onChange?.(value)}
        disabled={disabled}
      >
        <SelectTrigger
          id={name}
          name={name}
          aria-invalid={!!error}
          onBlur={onBlur}
          className="w-full"
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
