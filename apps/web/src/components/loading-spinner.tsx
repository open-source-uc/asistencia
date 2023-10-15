// import spinner from lucid-react
import { Loader2Icon } from "lucide-react";

export default function LoadingSpinner(): JSX.Element {
  return (
    <div className="w-16 h-16 border-4 border-gray-300 rounded-full animate-spin">
      <Loader2Icon size={64} />
    </div>
  );
}
