/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { X as TimesIcon } from "lucide-react";

const formatInput = (input: string) => {
  return input.replace(" ", "").replace(",", "").replace(";", "");
};

interface Value {
  pills: Set<string>;
  lastInputState: string;
}

interface InputPillsProps {
  onChange: (value: Value) => void;
}

export default function InputPills({ onChange }: InputPillsProps): JSX.Element {
  const [lastInputState, setLastInputState] = useState("");
  const [confirmRemove, setConfirmRemove] = useState(false);
  const [pills, setPills] = useState<Set<string>>(new Set());

  const addPill = () => {
    if (lastInputState === "") return;
    setPills((prev) => new Set(prev).add(formatInput(lastInputState)));
    setLastInputState("");
  };

  const removePill = (pill: string) => {
    setPills((prev) => {
      const newPills = new Set(prev);
      newPills.delete(pill);
      return newPills;
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmRemove(false);
    if (
      e.target.value.includes(" ") ||
      e.target.value.includes(",") ||
      e.target.value.includes(";")
    ) {
      addPill();
      return;
    }
    setLastInputState(e.target.value);
  };

  useEffect(() => {
    onChange({
      pills,
      lastInputState,
    });
  }, [pills, lastInputState]);

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row justify-center items-end relative mt-4">
        <div
          className={cn(
            "w-full flex flex-row flex-wrap items-center min-w-lg max-w-lg min-w-lg transition-all",
            "border border-slate-300 p-2",
            "focus-within:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:ring-opacity-50"
          )}
        >
          {Array.from(pills).map((pill, i) => (
            <div
              key={i}
              className={cn(
                "flex flex-row items-center justify-center rounded-full p-2 m-1 transition-all",
                "text-sm text-slate-500",
                confirmRemove && pill === Array.from(pills).pop()
                  ? "border border-destructive bg-red-200 text-black"
                  : "border border-slate-300 bg-slate-100"
              )}
            >
              {pill}
              <button
                className="ml-2"
                onClick={() => {
                  removePill(pill);
                }}
              >
                <TimesIcon size={15} />
              </button>
            </div>
          ))}
          <input
            className="focus:outline-none inline-flex h-12 text-sm px-2 placeholder:text-muted-foreground w-32 flex-auto"
            placeholder="ejemplo@ejemplo.com"
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addPill();
              }
            }}
            onKeyUp={(e) => {
              if (
                e.key === "Backspace" &&
                lastInputState === "" &&
                pills.size > 0
              ) {
                if (!confirmRemove) {
                  setConfirmRemove(true);
                  return;
                }
                setPills((prev) => {
                  const newPills = new Set(prev);
                  newPills.delete(Array.from(prev).pop() || "");
                  return newPills;
                });
                setConfirmRemove(false);
              }
            }}
            value={lastInputState}
          />
        </div>
      </div>
    </div>
  );
}
