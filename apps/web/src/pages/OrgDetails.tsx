import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useActivities } from "@/hooks/useActivities";
import { useAttendances } from "@/hooks/useAttendances";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { CalendarIcon, UserCheckIcon, UserIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import LoadingSpinner from "@/components/loading-spinner";
import { UserType } from "@/types/enums";
import type { OrgData } from "@/types/interfaces";
import { useToast } from "@/components/ui/use-toast";
import { ButtonClipboard } from "@/components/button-clipboard";
import { PopoverMessage } from "@/components/popover-message";
import { Info } from "lucide-react";
import { Separator } from "@/components/ui/separator";

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

export default function OrgDetails({
  orgData,
}: {
  orgData: OrgData;
}): JSX.Element {
  const navigate = useNavigate();
  const { orgId } = useParams();
  const { toast } = useToast();
  const { activities, isLoading } = useActivities(orgId);
  const { takeAttendance } = useAttendances(orgId);
  const [currActivity, setCurrActivity] = useState(0);
  const [inputState, setInputState] = useState("");

  const handleTakeAttendance = () => {
    if (inputState === "" || activities.length === 0) {
      toast({
        title: "Error al tomar asistencia",
        description:
          "Asegúrate de seleccionar una actividad y de ingresar un identificador de estudiante.",
        variant: "destructive",
      });
      return;
    }
    takeAttendance(activities[currActivity].slug, inputState);
    setInputState("");
  };

  return (
    <div className="space-y-6 flex flex-col items-center px-4 pb-20">
      <div className="flex flex-row items-center flex-wrap bg-slate-100 p-4 space-x-4">
        <PopoverMessage
          triggerComponent={
            <button className="p-2 rounded-full hover:bg-slate-200">
              <Info size={15} />
            </button>
          }
          text="Este identificador se utiliza para ver la asistencia de los estudiantes en Excel o Google Sheets."
        />
        <span className="font-bold ">ID de Organización</span>
        <div className="flex flex-row justify-center items-center">
          <Input
            value={orgId}
            readOnly={true}
            className="border border-slate-400 rounded-md"
          />
          <ButtonClipboard
            text={orgId || ""}
            alertDescription="ID de Organización copiado al portapapeles."
          />
        </div>
      </div>
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
            <div className="flex flex-col border-b-2" key={i}>
              <div
                className={cn(
                  "flex flex-row justify-start px-6 py-3 transition-all",
                  i === currActivity
                    ? "bg-primary text-primary-foreground"
                    : "cursor-pointer"
                )}
                onClick={() => setCurrActivity(i)}
              >
                <span className="w-32">
                  {activity.date?.toLocaleDateString()}
                </span>
                {i === currActivity ? (
                  <div className="flex flex-col space-y-2">
                    <span className="font-medium">{activity.slug}</span>
                    <div className="flex flex-row text-sm text-primary-foreground">
                      <span>{activity.name}</span>
                      <Separator orientation="vertical" className="mx-2" />
                      <span>{activity.description}</span>
                    </div>
                  </div>
                ) : (
                  <span className="font-medium">{activity.slug}</span>
                )}
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>
      {orgData.userType === UserType.ADMIN && (
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
      )}
    </div>
  );
}
