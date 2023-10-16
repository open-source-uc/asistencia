import { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

type InteractiveFormsProps = {
  leftComponent: JSX.Element;
  rightComponent: JSX.Element;
};

const isShowingClass = (boolean: boolean) =>
  boolean ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none";

export default function InteractiveForms({
  leftComponent,
  rightComponent,
}: InteractiveFormsProps): JSX.Element {
  const [activeForm, setActiveForm] = useState<"left" | "right">("left");
  const toggleSide = () => {
    if (activeForm === "left") setActiveForm("right");
    else setActiveForm("left");
  };

  return (
    <div className="relative flex flex-row items-stretch justify-center my-12 bg-gradient-to-r from-miku-1 to-miku-2 rounded-2xl p-2 flex-wrap">
      <div className="relative flex flex-col justify-center">
        <div
          className={cn(
            "transition-all",
            isShowingClass(activeForm === "left")
          )}
        >
          {leftComponent}
        </div>
        <Overlay
          {...{
            activeForm,
            toggleSide,
            otherSide: "right",
            label: "¿Ya tienes una cuenta?",
            buttonContent: "Inicia sesión",
          }}
        />
      </div>
      <div className="relative flex flex-col justify-center">
        <div
          className={cn(
            "transition-all",
            isShowingClass(activeForm === "right")
          )}
        >
          {rightComponent}
        </div>
        <Overlay
          {...{
            activeForm,
            toggleSide,
            otherSide: "left",
            label: "¿No tienes una cuenta?",
            buttonContent: "Regístrate",
          }}
        />
      </div>
    </div>
  );
}

const Overlay = ({
  activeForm,
  toggleSide,
  otherSide,
  label,
  buttonContent,
}: {
  activeForm: string;
  toggleSide: () => void;
  otherSide: string;
  label: string;
  buttonContent: string;
}) => {
  return (
    <div
      className={cn(
        "absolute w-full flex flex-col justify-center items-center h-full rounded-xl text-white transition-all",
        isShowingClass(activeForm === otherSide)
      )}
    >
      <span className="text-xl font-bold text-center mb-12">{label}</span>
      <Button
        variant={"roundedoutline"}
        onClick={() => toggleSide()}
        className="w-64 hover:text-black"
      >
        {buttonContent}
      </Button>
    </div>
  );
};
