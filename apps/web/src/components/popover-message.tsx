import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

export const PopoverMessage = ({
  triggerComponent,
  text,
}: {
  triggerComponent: JSX.Element;
  text: string;
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{triggerComponent}</PopoverTrigger>
      <PopoverContent>
        <span className="text-sm text-gray-600">{text}</span>
      </PopoverContent>
    </Popover>
  );
};
