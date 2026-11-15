import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

interface CheckboxOption {
  label: string;
  value: string;
}

interface CheckboxGroupRendererProps {
  label: string;
  name: string;
  options: CheckboxOption[];
  required?: boolean;
  disabled?: boolean;
  value?: string[];
  error?: string;
  colSpan?: number;
  rowSpan?: number;
  onChange?: (value: string[]) => void;
}

export function CheckboxGroupRenderer({
  label,
  name,
  options,
  required = false,
  disabled = false,
  value = [],
  error,
  colSpan = 1,
  rowSpan = 1,
  onChange,
}: CheckboxGroupRendererProps) {
  const handleChange = (checked: boolean, optionValue: string) => {
    const newValue = checked
      ? [...value, optionValue]
      : value.filter((item) => item !== optionValue);

    onChange?.(newValue);
  };

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

      <div className="flex flex-wrap gap-5">
        {options.map((option) => (
          <div key={option.value} className="flex items-center gap-2">
            <Checkbox
              id={`${name}-${option.value}`}
              name={name}
              checked={value.includes(option.value)}
              disabled={disabled}
              onCheckedChange={(checked) =>
                handleChange(checked === true, option.value)
              }
            />

            <Label htmlFor={`${name}-${option.value}`}>{option.label}</Label>
          </div>
        ))}
      </div>

      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
