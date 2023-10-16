// import spinner from lucid-react
import { Loader2Icon } from "lucide-react";

export default function LoadingSpinner(): JSX.Element {
  return (
    <div>
      <div className="rounded-full animate-spin flex justify-center items-center">
        <Loader2Icon size={64} />
      </div>
    </div>
  );
}
