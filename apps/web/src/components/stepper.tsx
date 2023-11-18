import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function Stepper({
  currentStep = 0,
  steps = [],
  className = "",
}: {
  currentStep?: number;
  steps?: string[];
  className?: string;
}): JSX.Element {
  const newSteps = steps.reduce((acc, step, i) => {
    if (i === steps.length - 1) {
      return [...acc, step];
    }
    return [...acc, step, ""];
  }, [] as string[]);
  return (
    <div className={cn("relative w-full mb-6", className)}>
      <ol className="flex items-center justify-center text-sm text-center text-slate-500 sm:text-base">
        {newSteps.map((step, i) =>
          (i + 1) % 2 === 0 ? (
            <Separator
              key={i}
              className={cn(
                "w-16 lg:w-32 h-[2px]",
                i <= currentStep * 2 ? "bg-primary" : "bg-slate-300"
              )}
            />
          ) : (
            <li
              key={i}
              className={cn(
                "relative flex flex-col items-center z-0 rounded-xl p-2",
                i <= currentStep * 2
                  ? "text-primary font-medium"
                  : "text-slate-400"
              )}
            >
              {i + 1 <= currentStep * 2 ? (
                <Check className="w-4 h-4 text-primary" />
              ) : (
                <div
                  className={cn(
                    "rounded-full w-2 h-2 m-1 flex items-center justify-center",
                    i === currentStep * 2 ? "bg-primary" : "bg-slate-300"
                  )}
                ></div>
              )}
              <span className="absolute top-8 w-32">{step}</span>
            </li>
          )
        )}
      </ol>
    </div>
  );
}
