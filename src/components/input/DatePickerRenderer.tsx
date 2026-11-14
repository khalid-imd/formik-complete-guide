import { format, parseISO, isValid } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerRendererProps {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  value?: string;
  error?: string;
  colSpan?: number;
  rowSpan?: number;
  onChange?: (value: string) => void;
  onBlur?: () => void;
}

export function DatePickerRenderer({
  label,
  name,
  placeholder = "Select date",
  required = false,
  disabled = false,
  value = "",
  error,
  colSpan = 1,
  rowSpan = 1,
  onChange,
  onBlur,
}: DatePickerRendererProps) {
  const selectedDate =
    value && isValid(parseISO(value)) ? parseISO(value) : undefined;

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

      <Popover>
        <PopoverTrigger
          render={
            <Button
              id={name}
              type="button"
              variant="outline"
              disabled={disabled}
              aria-invalid={!!error}
              className="w-full justify-between font-normal"
            >
              {selectedDate
                ? format(selectedDate, "dd MMMM yyyy")
                : placeholder}

              <CalendarIcon className="size-4 text-muted-foreground" />
            </Button>
          }
        />

        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => {
              onChange?.(date ? format(date, "yyyy-MM-dd") : "");
              onBlur?.();
            }}
          />
        </PopoverContent>
      </Popover>

      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
