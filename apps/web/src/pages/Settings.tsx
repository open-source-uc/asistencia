import { useNavigate } from "react-router-dom";
import { useUserSession } from "@/hooks/useUserSession";
import { Button } from "@/components/ui/button";

export default function Settings(): JSX.Element {
  const { userSession, logOut } = useUserSession();
  const navigate = useNavigate();

  return (
    <div className="space-y-6 flex flex-col items-center px-4">
      {userSession.isLoggedIn && (
        <>
          <h2 className="text-3xl font-bold text-center">
            {userSession.email}
          </h2>
        </>
      )}

      <Button
        onClick={() => {
          logOut();
          navigate(`/`);
        }}
      >
        Cerrar Sesión
      </Button>
    </div>
  );
}
