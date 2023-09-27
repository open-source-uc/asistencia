import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const links = [
  {
    label: "IIC3585-1 Diseño Avanzado de Aplicaciones Web",
    path: "/orgs/1",
  },
  {
    label: "IIC3686-1 Creación de Videojuegos",
    path: "/orgs/2",
  },
];

export default function Orgs(): JSX.Element {
  const navigate = useNavigate();
  return (
    <div className="space-y-6 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-center">Organizaciones</h2>
      <p>Tienes permiso para gestionar las siguientes organizaciones</p>
      <div className="space-y-6 flex flex-col w-full max-x-2xl">
        {links.map((link) => (
          <Button
            key={link.label}
            className="justify-center w-full"
            onClick={() => {
              navigate(link.path);
            }}
          >
            {link.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
