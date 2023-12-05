import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAssistants } from "@/hooks/useAssistants";
import InputSelectPills, {
  type Value,
  initialValue,
} from "@/components/input-select-pills";
import { Button } from "@/components/ui/button";
import { RemoveDialog } from "@/components/remove-dialog";
import {
  DataTable,
  SelectColumn,
  SortingColumn,
  RowSelection,
  GenericColumn,
} from "@/components/data-table";
import LoadingSpinner from "@/components/loading-spinner";
import type { OrgData } from "@/types/interfaces";
import { UserType } from "@/types/enums";

const columns = [
  SelectColumn,
  SortingColumn("Email", "email"),
  GenericColumn("Rol", "role"),
];
export default function Assistants({
  orgData,
}: {
  orgData: OrgData;
}): JSX.Element {
  const { orgId } = useParams();
  const { assistants, isLoading, addMultipleAssistantsToOrg } =
    useAssistants(orgId);
  const [checkedAssistants, setCheckedAssistants] = useState<RowSelection>({});
  const [isLoadingUpload, setIsLoadingUpload] = useState(false);
  const [inputState, setInputState] = useState<Value>(initialValue);
  const [error, setError] = useState("");

  const removeAssistant = (assistants: RowSelection) => {
    console.log("removed", assistants);
  };

  const addAssistants = () => {
    if (
      (inputState.pills.size === 0 && inputState.lastInputState.text === "") ||
      error !== ""
    )
      return;
    setIsLoadingUpload(true);
    const pills = new Set(inputState.pills);
    if (inputState.lastInputState.text !== "")
      pills.add(inputState.lastInputState);
    const assistantsToAdd = Array.from(pills).map((pill) => ({
      email: pill.text,
      role: pill.role,
    }));
    console.log(assistantsToAdd);
    addMultipleAssistantsToOrg(assistantsToAdd)
      .then(() => {
        setInputState(initialValue);
        setIsLoadingUpload(false);
      })
      .catch(() => {
        setError("Ha ocurrido un error al añadir los ayudantes");
        setIsLoadingUpload(false);
      });
  };

  return (
    <div className="space-y-6 flex flex-col items-center px-4">
      <h3 className="text-xl font-medium text-center">Gestionar Ayudantes</h3>
      <div className="flex flex-col w-full">
        <h3 className="text-xl font-medium">Añadir</h3>
        {!(orgData.userType === UserType.VIEWER) && (
          <div className="flex flex-row justify-center items-end relative mt-4">
            <InputSelectPills
              placeholder="ejemplo@ejemplo.com"
              onChange={(value: Value) => {
                setInputState(value);
              }}
              value={inputState}
              pattern={/[^@\s]+@[^@\s]+/g} // pattern for emails
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
        )}
        {error !== "" && (
          <span className="text-red-500 text-sm ml-2 mt-2 font-medium">
            {error}
          </span>
        )}

        <div className="border border-slate-200 p-4 mt-6">
          {isLoading && <LoadingSpinner />}
          {!isLoading && (
            <DataTable
              searchColumn={"email"}
              {...(!(orgData.userType === UserType.VIEWER) && {
                upperComponent: RemoveDialog({
                  onRemove: () => {
                    removeAssistant(checkedAssistants);
                  },
                  text: "Esta acción eliminará los ayudantes seleccionados de la organización. No se podrá deshacer.",
                }),
              })}
              data={assistants}
              columns={columns}
              rowSelection={checkedAssistants}
              setRowSelection={setCheckedAssistants}
            />
          )}
        </div>
      </div>
    </div>
  );
}
