import { Loader2Icon } from "lucide-react";

export default function LoadingSpinner({
  className = "",
  size = 64,
}: {
  className?: string;
  size?: number;
}): JSX.Element {
  return (
    <div className={className}>
      <div className="rounded-full animate-spin flex justify-center items-center">
        <Loader2Icon size={size} />
      </div>
    </div>
  );
}
