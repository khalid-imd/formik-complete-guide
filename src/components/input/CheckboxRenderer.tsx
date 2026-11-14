import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface CheckboxRendererProps {
  label: string;
  name: string;
  description?: string;
  disabled?: boolean;
  required?: boolean;
  value?: boolean;
  error?: string;
  colSpan?: number;
  rowSpan?: number;
  onChange?: (value: boolean) => void;
  onBlur?: () => void;
}

export function CheckboxRenderer({
  label,
  name,
  description,
  disabled = false,
  required = false,
  value = false,
  error,
  colSpan = 1,
  rowSpan = 1,
  onChange,
  onBlur,
}: CheckboxRendererProps) {
  return (
    <div
      className="min-w-0 space-y-2"
      style={{
        gridColumn: `span ${colSpan}`,
        gridRow: `span ${rowSpan}`,
      }}
    >
      <div className="flex items-start gap-3 rounded-lg border p-4">
        <Checkbox
          id={name}
          name={name}
          checked={value}
          disabled={disabled}
          onCheckedChange={(checked) => {
            onChange?.(checked === true);
          }}
          onBlur={onBlur}
        />

        <div className="space-y-1">
          <Label htmlFor={name}>
            {label}
            {required && <span className="ml-1 text-destructive">*</span>}
          </Label>

          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
      </div>

      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
