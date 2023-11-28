import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAssistants } from "@/hooks/useAssistants";
import InputPills from "@/components/input-pills";
import { Button } from "@/components/ui/button";
import { RemoveDialog } from "@/components/remove-dialog";
import {
  DataTable,
  SelectColumn,
  SortingColumn,
  IRowSelection,
  GenericColumn,
} from "@/components/data-table";
import LoadingSpinner from "@/components/loading-spinner";

const columns = [
  SelectColumn,
  SortingColumn("Email", "user_email"),
  GenericColumn("Rol", "role"),
];

interface Value {
  pills: Set<string>;
  lastInputState: string;
}
const initInputValue: Value = {
  pills: new Set(),
  lastInputState: "",
};

export default function Assistants(): JSX.Element {
  const { orgId } = useParams();
  const { assistants, isLoading, addMultipleAssistantsToOrg } =
    useAssistants(orgId);
  const [checkedAssistants, setCheckedAssistants] = useState<IRowSelection>({});
  const [isLoadingUpload, setIsLoadingUpload] = useState(false);
  const [inputState, setInputState] = useState<Value>(initInputValue);
  const [error, setError] = useState("");

  const removeAssistant = (assistants: IRowSelection) => {
    console.log("removed", assistants);
  };

  const addAssistants = () => {
    if (
      (inputState.pills.size === 0 && inputState.lastInputState === "") ||
      error !== ""
    )
      return;
    setIsLoadingUpload(true);
    const emails = new Set(inputState.pills);
    if (inputState.lastInputState !== "") emails.add(inputState.lastInputState);
    addMultipleAssistantsToOrg(Array.from(emails))
      .then(() => {
        setInputState(initInputValue);
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
        <div className="flex flex-row justify-center items-end relative mt-4">
          <InputPills
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
            className="h-16 w-64"
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

        <div className="mt-6">
          {isLoading && <LoadingSpinner />}
          {!isLoading && (
            <DataTable
              data={assistants}
              columns={columns}
              rowSelection={checkedAssistants}
              setRowSelection={setCheckedAssistants}
            />
          )}
        </div>
        <div className="flex flex-row justify-end items-center my-4">
          <RemoveDialog onRemove={() => removeAssistant(checkedAssistants)} />
        </div>
      </div>
    </div>
  );
}
