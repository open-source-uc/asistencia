import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export const HoverElement = ({
  triggerComponent,
  text,
}: {
  triggerComponent: JSX.Element;
  text: string;
}) => {
  return (
    <HoverCard>
      <HoverCardTrigger>{triggerComponent}</HoverCardTrigger>
      <HoverCardContent>
        <span className="text-sm text-gray-600">{text}</span>
      </HoverCardContent>
    </HoverCard>
  );
};
