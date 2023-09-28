import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { postRequest } from "@/lib/api-requests";
import { CalendarIcon, UserCheckIcon, UserIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  {
    name: "Gestionar Ayudantes",
    icon: UserCheckIcon,
    path: "./assistants",
  },
  {
    name: "Gestionar Alumnos",
    icon: UserIcon,
    path: "./students",
  },
  {
    name: "Gestionar Actividades",
    icon: CalendarIcon,
    path: "./activities",
  },
];

const activities = Array.from({ length: 10 }, (_, i) => ({
  name: `Actividad ${i + 1}`,
  date: `${(i + 1).toString().padStart(2, "0")}/09`,
})).reverse();

export default function OrgDetails(): JSX.Element {
  const navigate = useNavigate();
  const { orgId } = useParams();
  const [currActivity, setCurrActivity] = useState(0);
  const [inputState, setInputState] = useState("");

  const handleTakeAttendance = () => {
    if (inputState === "") return;
    postRequest(`${import.meta.env.VITE_API_URL}`, {
      participant: inputState,
      activity_id: currActivity,
      taken_by_id: 2,
    });
    setInputState("");
  };

  return (
    <div className="space-y-6 flex flex-col items-center px-4">
      <h2 className="text-2xl font-bold text-center">
        IIC3585-1 Diseño Avanzado de Aplicaciones Web
      </h2>
      <hr className="w-3/4 border-input border-1" />
      <div className="w-full flex flex-row flex-wrap justify-center items-center space-y-6 md:space-x-4 md:space-y-0 space-x-0">
        {links.map((link, i) => (
          <Button
            key={i}
            className="w-full md:w-56 flex flex-col h-auto justify-center py-6"
            onClick={() => {
              navigate(link.path);
            }}
          >
            <link.icon className="mr-2" size={48} />
            {link.name}
          </Button>
        ))}
      </div>
      <div className="py-6 space-y-4 w-full">
        <h3 className="text-xl font-medium text-center">Tomar Asistencia</h3>
        <ScrollArea className="h-96 border border-input-500 shadow-inner">
          {activities.map((activity, i) => (
            <div
              className={cn(
                "flex flex-row justify-start border-b-2 px-6 py-3 transition-all",
                i === currActivity
                  ? "bg-primary text-primary-foreground"
                  : "cursor-pointer"
              )}
              key={i}
              onClick={() => setCurrActivity(i)}
            >
              <span className="w-16">{activity.date}</span>
              <span>{activity.name}</span>
            </div>
          ))}
        </ScrollArea>
      </div>
      <div className="flex flex-row w-full relative">
        <Input
          variant={"rounded"}
          placeholder="Nombre Apellido"
          value={inputState}
          onChange={(e) => setInputState(e.target.value)}
        />
        <Button
          variant={"rounded"}
          className="w-64"
          onClick={handleTakeAttendance}
        >
          Tomar Asistencia
        </Button>
      </div>
    </div>
  );
}
