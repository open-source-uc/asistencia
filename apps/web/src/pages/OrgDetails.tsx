import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useActivities } from "@/hooks/useActivities";
// import { useOrg, useOrgs } from "@/hooks/useOrgs";
import { useAttendances } from "@/hooks/useAttendances";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { CalendarIcon, UserCheckIcon, UserIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import LoadingSpinner from "@/components/loading-spinner";

const links = [
  {
    name: "Gestionar Ayudantes",
    icon: UserCheckIcon,
    path: "./assistants",
  },
  {
    name: "Gestionar Estudiantes",
    icon: UserIcon,
    path: "./students",
  },
  {
    name: "Gestionar Actividades",
    icon: CalendarIcon,
    path: "./activities",
  },
];

export default function OrgDetails(): JSX.Element {
  const navigate = useNavigate();
  const { orgId } = useParams();
  const { activities, isLoading } = useActivities(orgId);
  const { takeAttendance, message } = useAttendances(orgId);
  const [currActivity, setCurrActivity] = useState(0);
  const [inputState, setInputState] = useState("");

  const handleTakeAttendance = () => {
    if (inputState === "") return;
    takeAttendance(activities[currActivity].slug, inputState);
    setInputState("");
  };

  return (
    <div className="space-y-6 flex flex-col items-center px-4">
      <div className="w-full flex flex-row flex-wrap justify-center items-center md:space-x-4 space-x-0">
        {links.map((link, i: number) => (
          <Button
            key={i}
            className="w-full md:w-56 flex flex-col h-auto justify-center py-6 my-3"
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
          {isLoading && <LoadingSpinner className="my-6" />}
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
              <span className="w-32">
                {activity.date?.toLocaleDateString()}
              </span>
              <span>{activity.slug}</span>
            </div>
          ))}
        </ScrollArea>
      </div>
      <div className="flex flex-row w-full relative">
        <Input
          placeholder="Identificador de Estudiante"
          value={inputState}
          onChange={(e) => setInputState(e.target.value)}
        />
        <Button className="w-64" onClick={handleTakeAttendance}>
          Tomar Asistencia
        </Button>
      </div>
      <span
        className={cn(
          message.type === "error" ? "text-red-500" : "text-primary",
          "animate-fade-in-up"
        )}
      >
        {message.message}
      </span>
    </div>
  );
}
