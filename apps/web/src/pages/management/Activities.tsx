import { useState } from "react";
import { useActivities } from "@/hooks/useActivities";
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
import AddActivityForm from "@/components/forms/add-activity-form";
import type { Activity, OrgData } from "@/types/interfaces";
import { UserType } from "@/types/enums";

const columns: ColumnDef<Activity>[] = [
  SelectColumn,
  DateColumn("Fecha", "date"),
  GenericColumn("Slug", "slug"),
  GenericColumn("Nombre", "name"),
  GenericColumn("Descripción", "description"),
];

export default function Activities({
  orgData,
}: {
  orgData: OrgData;
}): JSX.Element {
  const { orgId } = useParams();
  const activities = useActivities(orgId);
  const activitiesArray = activities.getActivities();
  const [checkedActivities, setCheckedActivities] = useState<RowSelection>({});

  const removeActivities = (activitiesToDelete: RowSelection) => {
    activities.deleteMultipleActivities(
      Object.keys(activitiesToDelete)
        .filter((key) => activitiesToDelete[key])
        .map((key) => activitiesArray[parseInt(key)].slug)
    );
  };

  return (
    <div className="space-y-6 flex flex-col items-center px-4">
      <h3 className="text-xl font-medium text-center">Gestionar Actividades</h3>
      <div className="flex flex-col w-full">
        {!(orgData.userType === UserType.VIEWER) && (
          <div className="border border-slate-200 p-4 mb-4">
            <h3 className="text-lg font-medium mb-2">Añadir</h3>
            <AddActivityForm
              addActivity={activities.createActivity}
              isLoading={
                activities.activitiesMutations.createActivity.isPending
              }
            />
          </div>
        )}
        {activities.activities.isLoading && <LoadingSpinner />}
        <div className="border border-slate-200 p-4">
          {!activities.activities.isLoading && (
            <DataTable
              searchColumn={"slug"}
              {...(!(orgData.userType === UserType.VIEWER) && {
                upperComponent: RemoveDialog({
                  onRemove: () => {
                    removeActivities(checkedActivities);
                  },
                  text: "Esta acción conllevará la eliminación de las asistencias asociadas a las actividades seleccionadas. Además, no se podrá deshacer.",
                }),
              })}
              data={activitiesArray}
              columns={columns}
              rowSelection={checkedActivities}
              setRowSelection={setCheckedActivities}
            />
          )}
        </div>
      </div>
    </div>
  );
}
