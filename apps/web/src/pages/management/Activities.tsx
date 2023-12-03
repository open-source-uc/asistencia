import { useState } from "react";
import { Activity, useActivities } from "@/hooks/useActivities";
import { useParams } from "react-router-dom";
import { RemoveDialog } from "@/components/remove-dialog";
import {
  DataTable,
  SelectColumn,
  GenericColumn,
  DateColumn,
  RowSelection,
} from "@/components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import LoadingSpinner from "@/components/loading-spinner";
import AddActivityForm from "@/components/add-activity-form";
import { cn } from "@/lib/utils";

const columns: ColumnDef<Activity>[] = [
  SelectColumn,
  DateColumn("Fecha", "date"),
  GenericColumn("Slug", "slug"),
  GenericColumn("Nombre", "name"),
  GenericColumn("Descripción", "description"),
];

export default function Activities(): JSX.Element {
  const { orgId } = useParams();
  const {
    activities,
    isLoading,
    createActivity,
    deleteMultipleActivities,
    message,
  } = useActivities(orgId);
  const [checkedActivities, setCheckedActivities] = useState<RowSelection>({});

  const removeActivities = (activitiesToDelete: RowSelection) => {
    deleteMultipleActivities(
      Object.keys(activitiesToDelete)
        .filter((key) => activitiesToDelete[key])
        .map((key) => activities[parseInt(key)].slug)
    );
  };

  return (
    <div className="space-y-6 flex flex-col items-center px-4">
      <h3 className="text-xl font-medium text-center">Gestionar Actividades</h3>
      <div className="flex flex-col w-full">
        <div className="border border-slate-200 rounded-lg p-4 mb-4">
          <h3 className="text-lg font-medium mb-2">Añadir</h3>
          <AddActivityForm addActivity={createActivity} />
          <div
            className={cn(
              message.type === "error" ? "text-red-500" : "text-primary",
              "animate-fade-in-up mt-3"
            )}
          >
            {message.content}
          </div>
        </div>
        {isLoading && <LoadingSpinner />}
        {!isLoading && (
          <DataTable
            data={activities}
            columns={columns}
            rowSelection={checkedActivities}
            setRowSelection={setCheckedActivities}
          />
        )}
      </div>
      <div className="flex flex-row justify-end items-center w-full">
        <RemoveDialog
          onRemove={() => removeActivities(checkedActivities)}
          text="Esta acción conllevará la eliminación de las asistencias asociadas a las actividades seleccionadas. Además, no se podrá deshacer."
        />
      </div>
    </div>
  );
}
