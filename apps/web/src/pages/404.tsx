import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function NotFound(): JSX.Element {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center w-full p-16 h-screen">
      <h1 className="text-5xl font-bold text-center my-6">AttendanceUC</h1>
      <h2 className="text-4xl font-bold text-center">
        Error 404
      </h2>
      <hr className="w-3/4 border-input border-1 my-4 border-primary-foreground" />
      <p>La página que buscas no existe o no tienes permisos para acceder.</p>
      <Button onClick={() => navigate("/")} className="my-12">
        Volver al inicio
      </Button>
    </div>
  );
}
