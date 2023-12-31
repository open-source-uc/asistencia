import { useUserSession } from "@/hooks/useUserSession";
import EditUser from "@/components/forms/edit-user";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import InputPassword from "@/components/input-password";
import { ButtonClipboard } from "@/components/button-clipboard";
import { Info } from "lucide-react";
import { PopoverMessage } from "@/components/popover-message";

export default function Settings(): JSX.Element {
  const { userSession, logOut } = useUserSession();
  const navigate = useNavigate();

  return (
    <div className="space-y-6 flex flex-col items-center px-4 w-full">
      {userSession.isLoggedIn && (
        <>
          <h2 className="text-3xl font-bold text-center">
            {userSession.email}
          </h2>
          <div className="flex flex-row items-center flex-wrap bg-slate-100 p-4 space-x-4">
            <PopoverMessage
              triggerComponent={
                <button className="p-2 rounded-full hover:bg-slate-200">
                  <Info size={15} />
                </button>
              }
              text="Este token es privado y no debería ser compartido con nadie."
            />
            <span className="font-bold ">Token de Usuario</span>
            <div className="flex flex-row justify-center items-center">
              <InputPassword
                value={userSession.access_token}
                readOnly={true}
                className="pr-12 border border-slate-400 rounded-md"
              />
              <ButtonClipboard
                text={userSession.access_token}
                alertTitle="Token copiado al portapapeles."
                alertDescription="Recuerda que este token es privado y no debería ser compartido con nadie."
              />
            </div>
          </div>
          <Button
            className="justify-center block lg:hidden bg-red-500 hover:bg-red-600"
            onClick={() => {
              logOut();
              navigate("/");
            }}
          >
            Cerrar Sesión
          </Button>
        </>
      )}
      <EditUser />
    </div>
  );
}
