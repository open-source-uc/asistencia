import { useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import LoginForm from "@/components/forms/login-form";
import RegisterForm from "@/components/forms/register-form";
import RecoverPassword from "@/components/forms/recover-password";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

const PAGE_STATE = {
  login: {
    buttonText: "Regístrate",
    label: "¿Aún no tienes una cuenta?",
    navigateTo: "?form=register",
    url: "?form=login",
  },
  register: {
    buttonText: "Inicia sesión",
    label: "¿Ya tienes una cuenta?",
    navigateTo: "?form=login",
    url: "?form=register",
  },
  recover: {
    buttonText: "Volver al inicio",
    label: "",
    navigateTo: "?form=login",
    url: "?form=recover",
  },
};

const handlePageChange = (form: string | undefined | null) => {
  if (form && Object.keys(PAGE_STATE).includes(form)) {
    return PAGE_STATE[form as keyof typeof PAGE_STATE];
  }
  return PAGE_STATE["login"];
};

export default function LandingPage(): JSX.Element {
  const navigate = useNavigate();
  const query = useQuery();
  const form = query.get("form");
  const formState = handlePageChange(form);

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
        {(form === "login" || !form) && (
          <>
            <LoginForm />
            <div className="text-sm my-4">
              Olvidaste tu contraseña?{" "}
              <span
                className="text-primary font-medium cursor-pointer"
                onClick={() => navigate(PAGE_STATE.recover.url)}
              >
                Recupérala aquí
              </span>
            </div>
          </>
        )}
        {form === "register" && <RegisterForm />}
        {form === "recover" && <RecoverPassword />}
        <Separator className="my-8 w-full" />
        <div className="flex flex-row space-x-4 items-center text-sm">
          {form !== "recover" && <span>{formState.label}</span>}
          <Button
            variant={"outline"}
            className="text-sm h-auto w-auto p-2 px-4"
            onClick={() => navigate(formState.navigateTo)}
          >
            {formState.buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
}
