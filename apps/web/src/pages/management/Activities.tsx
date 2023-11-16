import { useState } from "react";
import { Activity, useActivities } from "@/hooks/useActivities";
import { useParams } from "react-router-dom";
import { RemoveDialog } from "@/components/remove-dialog";
import {
  DataTable,
  SelectColumn,
  GenericColumn,
  DateColumn,
  IRowSelection,
} from "@/components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import LoadingSpinner from "@/components/loading-spinner";
import AddActivityForm from "@/components/add-activity-form";

const columns: ColumnDef<Activity>[] = [
  SelectColumn,
  DateColumn("Fecha", "date"),
  GenericColumn("Nombre", "slug"),
  GenericColumn("Tipo", "event_type"),
];

export default function Activities(): JSX.Element {
  const { orgId } = useParams();
  const { activities, isLoading, createActivity } = useActivities(orgId);
  const [checkedActivities, setCheckedActivities] = useState<IRowSelection>({});

  const removeActivities = (activities: IRowSelection) => {
    console.log("removed", activities);
  };

  return (
    <div className="space-y-6 flex flex-col items-center px-4">
      <h3 className="text-xl font-medium text-center">Gestionar Actividades</h3>
      <div className="flex flex-col w-full">
        <div className="border border-slate-200 rounded-lg p-4 mb-4">
          <h3 className="text-lg font-medium mb-2">Añadir</h3>
          <AddActivityForm addActivity={createActivity} />
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
      <div className="flex flex-row justify-end items-center">
        <RemoveDialog onRemove={() => removeActivities(checkedActivities)} />
      </div>
    </div>
  );
}
