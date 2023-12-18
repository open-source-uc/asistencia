import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import InputPills, { type Value, initialValue } from "@/components/input-pills";
import { Button } from "@/components/ui/button";
import { UserType } from "@/types/enums";
import { ASSISTANTS_ROLES } from "@/lib/constants/assistantsRoles";

export default function AddAssistantForm({
  addMultipleAssistantsToOrg,
}: {
  addMultipleAssistantsToOrg: (
    assistants: string[],
    role: UserType | undefined
  ) => Promise<void>;
}) {
  const [isLoadingUpload, setIsLoadingUpload] = useState(false);
  const [inputState, setInputState] = useState<Value>(initialValue);
  const [error, setError] = useState<string>("");
  const [role, setRole] = useState<UserType | undefined>();
  const { toast } = useToast();

  const patternToFollow = /[^@\s]+@[^@\s]+/g; // pattern for emails

  const addAssistants = () => {
    if (
      patternToFollow.test(inputState.lastInputState) === false &&
      inputState.lastInputState !== ""
    ) {
      toast({
        title: "Error",
        description: "El correo electrónico ingresado no es válido.",
        variant: "destructive",
      });
      return;
    }
    if (!role) {
      toast({
        title: "Ha ocurrido un error",
        description: "Debes seleccionar un rol para los asistentes.",
        variant: "destructive",
      });
      return;
    }
    if (inputState.pills.size === 0 && inputState.lastInputState === "") {
      return;
    }
    setIsLoadingUpload(true);
    const pills = new Set(inputState.pills);
    if (inputState.lastInputState !== "") pills.add(inputState.lastInputState);
    const assistantsToAdd = Array.from(pills);
    addMultipleAssistantsToOrg(assistantsToAdd, role)
      .then(() => {
        setInputState(initialValue);
        setIsLoadingUpload(false);
        toast({
          title: "Ayudantes añadidos",
          description: "Los ayudantes han sido añadidos correctamente.",
          variant: "success",
        });
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Ha ocurrido un error al añadir los ayudantes.",
          variant: "destructive",
        });
        setIsLoadingUpload(false);
      });
  };
  return (
    <div className="flex flex-col justify-center relative mt-4 border border-slate-200 p-4">
      <span className="text-sm font-medium">Selecciona el rol</span>
      <SelectUserRol
        className="w-36 mt-2 mb-4"
        onChange={(value) => {
          setRole(value as UserType);
        }}
        value={role}
      />
      <span className="text-sm font-medium">
        Ingresa los correos electrónicos
      </span>
      <div className="flex flex-row justify-center items-end">
        <InputPills
          className="mt-4"
          placeholder="ejemplo@ejemplo.com"
          onChange={(value: Value) => {
            setInputState(value);
          }}
          value={inputState}
          pattern={patternToFollow}
          onPatternError={(error: boolean) => {
            setError(error ? "Email inválido" : "");
          }}
        />
        <Button
          onClick={addAssistants}
          className="h-16"
          isLoading={isLoadingUpload}
        >
          Añadir
        </Button>
      </div>
      {error !== "" && (
        <span className="text-red-500 text-sm ml-2 mt-2 font-medium">
          {error}
        </span>
      )}
    </div>
  );
}

const SelectUserRol = ({
  value,
  onChange,
  className,
}: {
  value?: string;
  onChange: (value: string) => void;
  className?: string;
}) => {
  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger className={cn("", className)}>
        <SelectValue placeholder="Rol" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>
            Selecciona el rol de los ayudantes a agregar
          </SelectLabel>
          {Object.keys(ASSISTANTS_ROLES).map((rawRole) => (
            <SelectItem key={rawRole} value={rawRole}>
              {ASSISTANTS_ROLES[rawRole as keyof typeof ASSISTANTS_ROLES]}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
