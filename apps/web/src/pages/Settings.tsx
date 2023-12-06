import { useEffect, useState } from "react";
import { useUserSession } from "@/hooks/useUserSession";
import EditUser from "@/components/auth/edit-user";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import InputPassword from "@/components/input-password";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Check, Copy, Info } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

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
            <HoverElement
              triggerComponent={<Info size={15} />}
              text="Este token es privado y no debería ser compartido con nadie."
            />
            <span className="font-bold ">Token de Usuario</span>
            <div className="flex flex-row justify-center items-center">
              <InputPassword
                value={userSession.access_token}
                readOnly={true}
                className="pr-12 border border-slate-400 rounded-md"
              />
              <ClipboardButton
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

const HoverElement = ({
  triggerComponent,
  text,
}: {
  triggerComponent: JSX.Element;
  text: string;
}) => {
  return (
    <HoverCard>
      <HoverCardTrigger>{triggerComponent}</HoverCardTrigger>
      <HoverCardContent>
        <span className="text-sm text-gray-600">{text}</span>
      </HoverCardContent>
    </HoverCard>
  );
};

const ClipboardButton = ({
  text,
  alertTitle,
  alertDescription,
}: {
  text: string;
  alertTitle: string;
  alertDescription: string;
}) => {
  const { toast } = useToast();
  const [isCopied, setIsCopied] = useState<boolean>(false);
  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);
  return (
    <Button
      variant={"noshadow"}
      className="p-3"
      onClick={() => {
        setIsCopied(true);
        navigator.clipboard.writeText(text);
        toast({
          title: alertTitle,
          description: alertDescription,
        });
      }}
    >
      {isCopied ? (
        <Check size={16} color="white" />
      ) : (
        <Copy size={16} color="white" />
      )}
    </Button>
  );
};
