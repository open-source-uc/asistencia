/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Item {
  label: string;
  value: string;
}

export function Combobox({
  items = [],
  onChange = () => {},
  value: propValue = "",
  placeholder = "",
  searchPlaceholder = "Search...",
  emptyMessage = "No items found.",
}: {
  items?: Item[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  onChange?: (value: string) => void;
  value?: string;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(propValue);
  useEffect(() => {
    if (propValue !== value) setValue(propValue);
  }, [propValue]);

  useEffect(() => {
    onChange(value);
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? items.find((item) => item.value === value)?.label
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandEmpty>{emptyMessage}</CommandEmpty>
          <CommandGroup>
            {items.map((item: Item) => (
              <CommandItem
                key={item.value}
                value={item.value}
                onSelect={() => {
                  const currentValue = item.value;
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === item.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
