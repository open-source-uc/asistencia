/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { X as TimesIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { UserType } from "@/types/enums";

const formatInput = (input: string) => {
  return input.replace(" ", "").replace(",", "").replace(";", "");
};

const followsPattern = (pattern: RegExp, input: string) => {
  return input.match(pattern) !== null;
};

function arequalSets(a: Set<Pill>, b: Set<Pill>) {
  if (a === b) return true;
  if (a.size !== b.size) return false;
  for (const value of a) if (!b.has(value)) return false;
  return true;
}

export interface Pill {
  text: string;
  role: UserType | undefined;
}

export interface Value {
  pills: Set<Pill>;
  lastInputState: Pill;
}

export interface InputSelectPillsProps {
  value?: Value;
  onChange: (value: Value) => void;
  pattern?: RegExp;
  placeholder?: string;
  onPatternError?: (error: boolean) => void;
}

const initialInputState = {
  text: "",
  role: undefined,
};

export const initialValue: Value = {
  pills: new Set(),
  lastInputState: initialInputState,
};

export default function InputSelectPills({
  value,
  onChange,
  pattern = /.*?/, // default pattern that accepts all strings
  placeholder,
  onPatternError,
}: InputSelectPillsProps): JSX.Element {
  const [lastInputState, setLastInputState] = useState<Pill>(initialInputState);
  const [confirmRemove, setConfirmRemove] = useState(false);
  const [pills, setPills] = useState<Set<Pill>>(new Set());
  const [patternError, setPatternError] = useState<boolean>(false);

  const addPill = () => {
    if (!followsPattern(pattern, lastInputState.text)) {
      setPatternError(true);
      return;
    }
    setPatternError(false);
    setPills((prev) =>
      new Set(prev).add({
        ...lastInputState,
        text: formatInput(lastInputState.text),
      })
    );
    setLastInputState(initialInputState);
  };

  const removePill = (pill: Pill) => {
    setPills((prev) => {
      const newPills = new Set(prev);
      newPills.delete(pill);
      return newPills;
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmRemove(false);
    const text = e.target.value;
    if (text.includes(" ") || text.includes(",") || text.includes(";")) {
      addPill();
      return;
    }
    setLastInputState((prev) => ({ ...prev, text }));
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

  const isPillToBeRemoved = (pill: Pill) => {
    return confirmRemove && pill === Array.from(pills).pop();
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row justify-center items-end relative mt-4">
        <div
          className={cn(
            "flex flex-row flex-wrap items-center lg:min-w-lg lg:max-w-lg transition-all",
            "border border-slate-300 p-2 bg-white",
            "focus-within:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:ring-opacity-50"
          )}
        >
          {Array.from(pills).map((pill, i) => (
            <div
              key={i}
              className={cn(
                "flex flex-row items-center justify-center rounded-full p-2 m-1 transition-all",
                "text-sm text-slate-500 border ",
                isPillToBeRemoved(pill)
                  ? "border-destructive bg-red-200 text-black"
                  : "border-slate-300 bg-slate-50"
              )}
            >
              <SelectUserRol
                value={pill.role}
                onChange={(value) => {
                  setPills((prev) => {
                    const newPills = new Array(...prev);
                    const index = newPills.findIndex((p) => p === pill);
                    newPills[index] = { ...pill, role: value as UserType };
                    return new Set(newPills);
                  });
                }}
                className={cn(
                  "rounded-full mr-2 text-xs p-2 h-auto bg-slate-200 border border-slate-400",
                  isPillToBeRemoved(pill)
                    ? "border-destructive bg-red-300 text-black"
                    : "bg-slate-200 border-slate-400"
                )}
              />
              {pill.text}
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
          <div className="flex flex-row items-center w-full">
            <SelectUserRol
              className="rounded mr-1 w-32"
              onChange={(value) => {
                setLastInputState((prev) => ({
                  ...prev,
                  role: value as UserType,
                }));
              }}
              value={lastInputState.role}
            />
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
                  lastInputState.text === initialInputState.text &&
                  pills.size > 0
                ) {
                  if (!confirmRemove) {
                    setConfirmRemove(true);
                    return;
                  }
                  setPills((prev) => {
                    const newPills = new Set(prev);
                    newPills.delete(
                      Array.from(prev).pop() || initialInputState
                    );
                    return newPills;
                  });
                  setConfirmRemove(false);
                }
              }}
              value={lastInputState.text}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const SelectUserRol = ({
  value,
  onChange,
  className,
}: {
  value?: string;
  onChange: (value: string) => void;
  className?: string;
}) => {
  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger className={cn("", className)}>
        <SelectValue placeholder="Rol" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>
            Selecciona el rol del usuario que vas a agregar
          </SelectLabel>
          <SelectItem value="viewer">Espectador</SelectItem>
          <SelectItem value="manager">Gestor</SelectItem>
          <SelectItem value="admin">Administrador</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
