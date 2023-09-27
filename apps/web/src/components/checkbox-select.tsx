import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface CheckboxSelectProps extends React.ComponentPropsWithoutRef<"div"> {
  index?: number;
  text: string;
  checked: boolean;
  toggleChecked: () => void;
}

const CheckboxSelect = React.forwardRef(function CheckboxSelect(
  { index, text, className, checked, toggleChecked }: CheckboxSelectProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <div
      className={
        "font-medium rounded-full border border-input px-4 py-2 flex items-center space-x-2 cursor-pointer transition-all select-none hover:bg-input " +
        (checked ? "border-primary bg-input shadow " : "") +
        className
      }
      onClick={() => toggleChecked()}
      ref={ref}
    >
      {index !== undefined && <span className="w-4 ml-2">{index}</span>}
      <Checkbox checked={checked} />
      <span>{text}</span>
    </div>
  );
});

export default CheckboxSelect;
