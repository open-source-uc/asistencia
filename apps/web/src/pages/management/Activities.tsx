import { useState } from "react";
import { ActivityField, Activity, useActivities } from "@/hooks/useActivities";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RemoveDialog } from "@/components/remove-dialog";
import {
  DataTable,
  SelectColumn,
  GenericColumn,
  DateColumn,
  IRowSelection,
} from "@/components/data-table";
import { DatePicker } from "@/components/date-picker";
import { ColumnDef } from "@tanstack/react-table";
import LoadingSpinner from "@/components/loading-spinner";

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
  const [formData, setFormData] = useState<ActivityField>({
    date: new Date(),
    slug: "",
    event_type: 1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const removeActivities = (activities: IRowSelection) => {
    console.log("removed", activities);
  };

  const addActivity = () => {
    if (formData.slug === "") return;
    createActivity(formData);
  };

  return (
    <div className="space-y-6 flex flex-col items-center px-4">
      <h3 className="text-xl font-medium text-center">Gestionar Actividades</h3>
      <div className="flex flex-col w-full">
        <div className="border border-slate-200 rounded-lg p-4 mb-4">
          <h3 className="text-lg font-medium mb-2">Añadir</h3>
          <div className="flex md:flex-row justify-center items-end relative md:space-x-4 flex-col">
            <div className="flex flex-col space-y-1">
              <span>Fecha</span>
              <DatePicker
                date={formData.date}
                setDate={(date: Date) => setFormData({ ...formData, date })}
                className="w-32"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <span>Nombre</span>
              <Input
                name="slug"
                placeholder="Nombre"
                className="w-32"
                value={formData.slug}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col space-y-1">
              <span>Tipo</span>
              <Input
                name="event_type"
                placeholder="Tipo de Actividad"
                className="w-32"
                type="number"
                value={formData.event_type}
                onChange={handleChange}
              />
            </div>
            <Button onClick={addActivity} className="w-32">
              Añadir
            </Button>
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
      <div className="flex flex-row justify-end items-center">
        <RemoveDialog onRemove={() => removeActivities(checkedActivities)} />
      </div>
    </div>
  );
}
