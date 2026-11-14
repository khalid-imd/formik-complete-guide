import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface SwitchRendererProps {
  label: string;
  name: string;
  description?: string;
  disabled?: boolean;
  value?: boolean;
  error?: string;
  colSpan?: number;
  rowSpan?: number;
  onChange?: (value: boolean) => void;
  onBlur?: () => void;
}

export function SwitchRenderer({
  label,
  name,
  description,
  disabled = false,
  value = false,
  error,
  colSpan = 1,
  rowSpan = 1,
  onChange,
  onBlur,
}: SwitchRendererProps) {
  return (
    <div
      className="min-w-0 space-y-2"
      style={{
        gridColumn: `span ${colSpan}`,
        gridRow: `span ${rowSpan}`,
      }}
    >
      <div className="flex items-center justify-between gap-4 rounded-lg border p-4">
        <div className="space-y-1">
          <Label htmlFor={name}>{label}</Label>

          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>

        <Switch
          id={name}
          name={name}
          checked={value}
          disabled={disabled}
          onCheckedChange={onChange}
          onBlur={onBlur}
        />
      </div>

      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
