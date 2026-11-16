import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

interface RadioOption {
  label: string;
  value: string;
}

interface RadioRendererProps {
  label: string;
  name: string;
  options: RadioOption[];
  required?: boolean;
  disabled?: boolean;
  value?: string;
  error?: string;
  colSpan?: number;
  rowSpan?: number;
  onChange?: (value: string) => void;
  onBlur?: () => void;
}

export function RadioRenderer({
  label,
  name,
  options,
  required = false,
  disabled = false,
  value = "",
  error,
  colSpan = 1,
  rowSpan = 1,
  onChange,
  onBlur,
}: RadioRendererProps) {
  return (
    <div
      className="min-w-0 space-y-3"
      style={{
        gridColumn: `span ${colSpan}`,
        gridRow: `span ${rowSpan}`,
      }}
    >
      <Label>
        {label}
        {required && <span className="ml-1 text-destructive">*</span>}
      </Label>

      <RadioGroup
        name={name}
        value={value}
        onValueChange={(value) => {
          onChange?.(value);
          onBlur?.();
        }}
        disabled={disabled}
        className="flex flex-wrap gap-5"
      >
        {options.map((option) => (
          <div key={option.value} className="flex items-center gap-2">
            <RadioGroupItem
              id={`${name}-${option.value}`}
              value={option.value}
            />

            <Label htmlFor={`${name}-${option.value}`}>{option.label}</Label>
          </div>
        ))}
      </RadioGroup>

      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
