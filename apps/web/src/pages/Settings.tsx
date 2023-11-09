import { useUserSession } from "@/hooks/useUserSession";
import EditUser from "@/components/auth/edit-user";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

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
