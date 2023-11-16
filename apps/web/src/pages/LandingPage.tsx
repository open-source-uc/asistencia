import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import LoginForm from "@/components/auth/login-form";
import RegisterForm from "@/components/auth/register-form";
import RecoverPassword from "@/components/auth/recover-password";

const PAGE_STATE = {
  login: {
    buttonText: "Regístrate",
    label: "¿Aún no tienes una cuenta?",
  },
  register: {
    buttonText: "Inicia sesión",
    label: "¿Ya tienes una cuenta?",
  },
  recover: {
    buttonText: "Volver al inicio",
    label: "",
  },
};

export default function LandingPage(): JSX.Element {
  const [activeForm, setActiveForm] = useState<
    "login" | "register" | "recover"
  >("login");
  const handleToggle = () => {
    if (activeForm === "login") setActiveForm("register");
    else setActiveForm("login");
  };
  return (
    <div className="flex lg:flex-row flex-col w-full items-center justify-center bg-gradient-to-b from-miku-1 to-miku-2 text-miku-foreground py-16 lg:h-screen">
      <div className="flex lg:w-1/2 space-y-6 justify-center">
        <div className="flex flex-col lg:w-96 p-6 lg:p-0">
          <h2 className="text-4xl font-bold">Bienvenido a AttendanceUC</h2>

          <p className="mt-6">
            Tu aplicación para gestionar una toma de asistencia eficiente en tu
            sala de clases.
          </p>
        </div>
      </div>
      <div className="bg-white p-12 flex flex-col justify-center h-screen text-foreground w-full lg:w-1/2">
        {activeForm === "login" && <LoginForm />}
        {activeForm === "register" && <RegisterForm />}
        {activeForm === "recover" && <RecoverPassword />}
        {activeForm === "login" && (
          <div className="text-sm my-4">
            Olvidaste tu contraseña?{" "}
            <span
              className="text-primary font-medium cursor-pointer"
              onClick={() => setActiveForm("recover")}
            >
              Recupérala aquí
            </span>
          </div>
        )}
        <Separator className="my-8 w-full" />
        <div className="flex flex-row space-x-4 items-center text-sm">
          {activeForm !== "recover" && (
            <span>{PAGE_STATE[activeForm].label}</span>
          )}
          <Button
            variant={"outline"}
            className="text-sm h-auto w-auto p-2 px-4"
            onClick={handleToggle}
          >
            {PAGE_STATE[activeForm].buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
}
