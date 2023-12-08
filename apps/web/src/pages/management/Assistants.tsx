import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAssistants } from "@/hooks/useAssistants";
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
import AddAssistantForm from "@/components/forms/add-assistant-form";
import { ASSISTANTS_ROLES } from "@/lib/constants/assistantsRoles";

const columns = [
  SelectColumn,
  SortingColumn("Email", "email"),
  GenericColumn(
    "Rol",
    "role",
    (value: string) =>
      ASSISTANTS_ROLES[value as keyof typeof ASSISTANTS_ROLES] || value
  ),
];
export default function Assistants({
  orgData,
}: {
  orgData: OrgData;
}): JSX.Element {
  const { orgId } = useParams();
  const {
    assistants,
    isLoading,
    addMultipleAssistantsToOrg,
    removeMultipleAssistantsFromOrg,
  } = useAssistants(orgId);
  const [checkedAssistants, setCheckedAssistants] = useState<RowSelection>({});

  const removeAssistants = (assistantsIndexes: RowSelection) => {
    const arrayIndexes = Object.keys(assistantsIndexes).map((key) =>
      parseInt(key)
    );
    const assistantsToRemove = arrayIndexes.map((index) => assistants[index]);
    removeMultipleAssistantsFromOrg(assistantsToRemove);
  };

  return (
    <div className="space-y-6 flex flex-col items-center px-4">
      <h3 className="text-xl font-medium text-center">Gestionar Ayudantes</h3>
      <div className="flex flex-col w-full">
        <h3 className="text-lg font-medium">Añadir a la Organización</h3>
        {!(orgData.userType === UserType.VIEWER) && (
          <AddAssistantForm
            addMultipleAssistantsToOrg={addMultipleAssistantsToOrg}
          />
        )}

        <div className="border border-slate-200 p-4 mt-6">
          {isLoading && <LoadingSpinner />}
          {!isLoading && (
            <DataTable
              searchColumn={"email"}
              {...(!(orgData.userType === UserType.VIEWER) && {
                upperComponent: RemoveDialog({
                  onRemove: () => {
                    removeAssistants(checkedAssistants);
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
