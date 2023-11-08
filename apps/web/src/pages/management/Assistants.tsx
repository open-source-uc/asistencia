import { useState } from "react";
import { useParams } from "react-router-dom";
import { handlerAssistants, useAssistants } from "@/hooks/useAssistants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

export default function Assistants(): JSX.Element {
  const { orgId } = useParams();
  const { assistants, isLoading, createAssistantByOrg } = useAssistants(orgId);
  const [checkedAssistants, setCheckedAssistants] = useState<IRowSelection>({});
  const [inputState, setInputState] = useState("");
  const [error, setError] = useState("");

  const removeAssistant = (assistants: IRowSelection) => {
    console.log("removed", assistants);
  };
  const addAssistant = () => {
    if (inputState === "") return;
    createAssistantByOrg(inputState).catch(() => {
      setError("No se ha podido añadir el ayudante");
    });
    setInputState("");
  };

  return (
    <div className="space-y-6 flex flex-col items-center px-4">
      <h3 className="text-xl font-medium text-center">Gestionar Ayudantes</h3>
      <div className="flex flex-col w-full">
        <h3 className="text-xl font-medium">Añadir</h3>
        <div className="flex flex-row justify-center items-center relative mt-4">
          <Input
            placeholder="ejemplo@uc.cl"
            variant={"rounded"}
            onChange={(e) => setInputState(e.target.value)}
            value={inputState}
          />
          <Button variant={"rounded"} onClick={addAssistant}>
            Añadir
          </Button>
        </div>
        {error !== "" && (
          <span className="text-red-500 text-sm ml-2 mt-2">{error}</span>
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
