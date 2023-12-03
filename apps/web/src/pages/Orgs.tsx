import { useState } from "react";
import { useOrgs } from "@/hooks/useOrgs";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/loading-spinner";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontalIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Orgs(): JSX.Element {
  const { orgs, isLoading, deleteOrg } = useOrgs();
  const navigate = useNavigate();
  const [state, setState] = useState({
    orgSlugSelected: "",
    alertOpen: false,
  });

  return (
    <div className="space-y-6 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-center">Organizaciones</h2>
      <p>Tienes permiso para gestionar las siguientes organizaciones</p>
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <div className="space-y-6 flex flex-col w-full max-x-2xl">
          {orgs.map((course, i) => (
            <div key={i} className="relative group justify-center items-center">
              <Button
                className="justify-center w-full py-6"
                onClick={() => {
                  navigate(`/orgs/${course.slug}`);
                }}
              >
                {course.name}
              </Button>
              <DropdownOptionsMenu
                options={[
                  {
                    label: "Eliminar",
                    onClick: () => {
                      setState({
                        orgSlugSelected: course.slug,
                        alertOpen: true,
                      });
                    },
                    isDestructive: true,
                  },
                ]}
              />
            </div>
          ))}
        </div>
      )}
      <AlertDialog
        open={state.alertOpen}
        onOpenChange={(open) => {
          setState({ ...state, alertOpen: open });
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción conlleva la eliminación de la organización, incluyendo
              todas las actividades, asistencias y estudiantes asociados.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                deleteOrg(state.orgSlugSelected);
              }}
              className="bg-red-500 hover:bg-red-600"
            >
              Eliminar organización
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

interface Option {
  label: string;
  onClick: () => void;
  isDestructive?: boolean;
}

const DropdownOptionsMenu = ({ options = [] }: { options: Option[] }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "absolute right-6 all-unset top-1/2 transform -translate-y-1/2",
            "group-hover:opacity-100 opacity-0 transition-opacity duration-300 ease-in-out"
          )}
        >
          <MoreHorizontalIcon className="text-white" size={24} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 rounded">
        <DropdownMenuLabel>Opciones</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {options.map((option, i) => (
            <DropdownMenuItem
              key={i}
              className="cursor-pointer"
              onClick={option.onClick}
            >
              <span className={cn(option.isDestructive ? "text-red-500" : "")}>
                {option.label}
              </span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
