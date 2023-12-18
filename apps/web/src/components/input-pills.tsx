/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { X as TimesIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const formatInput = (input: string, separators: string[]) => {
  separators.forEach((separator) => {
    input = input.replace(separator, " ");
  });
  return input;
};

const followsPattern = (pattern: RegExp, input: string) => {
  return input.match(pattern) !== null;
};

function arequalSets(a: Set<string>, b: Set<string>) {
  if (a === b) return true;
  if (a.size !== b.size) return false;
  for (const value of a) if (!b.has(value)) return false;
  return true;
}

export interface Value {
  pills: Set<string>;
  lastInputState: string;
}

export interface InputPillsProps {
  value?: Value;
  onChange: (value: Value) => void;
  pattern?: RegExp;
  placeholder?: string;
  onPatternError?: (error: boolean) => void;
  separators?: string[];
  className?: string;
}

export const initialValue: Value = {
  pills: new Set(),
  lastInputState: "",
};

export default function InputPills({
  value,
  onChange,
  pattern = /.*?/, // default pattern that accepts all strings
  placeholder,
  onPatternError,
  separators = [",", " ", ";"],
  className,
}: InputPillsProps): JSX.Element {
  const [lastInputState, setLastInputState] = useState(
    initialValue.lastInputState
  );
  const [confirmRemove, setConfirmRemove] = useState(false);
  const [pills, setPills] = useState<Set<string>>(initialValue.pills);
  const [patternError, setPatternError] = useState<boolean>(false);

  const addPill = () => {
    if (!followsPattern(pattern, lastInputState)) {
      setPatternError(true);
      return;
    }
    setPatternError(false);
    setPills((prev) =>
      new Set(prev).add(formatInput(lastInputState, separators))
    );
    setLastInputState(initialValue.lastInputState);
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
    const text = e.target.value;
    if (separators.some((separator) => text.includes(separator))) {
      addPill();
      return;
    }
    setLastInputState(text);
    if (patternError && followsPattern(pattern, text)) {
      setPatternError(false);
    }
  };

  useEffect(() => {
    onChange({
      pills,
      lastInputState,
    });
  }, [pills, lastInputState]);

  useEffect(() => {
    if (
      value &&
      (!arequalSets(value.pills, pills) ||
        value.lastInputState !== lastInputState)
    ) {
      setPills(value.pills);
      setLastInputState(value.lastInputState);
    }
  }, [value]);

  useEffect(() => {
    if (onPatternError) {
      onPatternError(patternError);
    }
  }, [patternError]);

  const isPillToBeRemoved = (pill: string) => {
    return confirmRemove && pill === Array.from(pills).pop();
  };

  return (
    <div
      className={cn(
        "flex flex-row justify-center items-end relative",
        className
      )}
    >
      <div
        className={cn(
          "flex flex-row flex-wrap items-center lg:min-w-lg lg:max-w-lg transition-all",
          "border border-slate-300 p-2 bg-white",
          "focus-within:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:ring-opacity-50"
        )}
      >
        {Array.from(pills).map((pill, i) => (
          <Badge
            key={i}
            variant={isPillToBeRemoved(pill) ? "destructive" : "secondary"}
            className={cn("p-1 px-2 m-1 transition-all")}
          >
            {pill}
            <button
              className="ml-2"
              onClick={() => {
                removePill(pill);
              }}
            >
              <TimesIcon
                size={15}
                className="text-muted-foreground hover:text-foreground"
              />
            </button>
          </Badge>
        ))}
        <div className="flex flex-row items-center w-full">
          <input
            className="focus:outline-none inline-flex h-12 text-sm px-2 placeholder:text-muted-foreground lg:w-32 flex-auto"
            placeholder={placeholder}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addPill();
              }
            }}
            spellCheck={false}
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
