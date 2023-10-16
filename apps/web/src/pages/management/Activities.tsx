import { useState } from "react";
import {
  IActivityField,
  IActivity,
  useActivities,
} from "@/hooks/useActivities";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RemoveDialog } from "@/components/remove-dialog";
import {
  DataTable,
  SelectColumn,
  GenericColumn,
  SortingColumn,
  IRowSelection,
} from "@/components/data-table";
import { DatePicker } from "@/components/date-picker";
import { ColumnDef } from "@tanstack/react-table";
import LoadingSpinner from "@/components/loading-spinner";

const MockUpactivities = [
  {
    slug: "AAA",
    name: "La primera clase",
    planned_date: "08-08-2020",
    grade: "0.1",
    id: 1,
  },
  {
    slug: "DB",
    name: "Bases de Datos",
    planned_date: "10-08-2020",
    grade: "0.2",
    id: 2,
  },
  {
    slug: "BUG",
    name: "Debugging",
    planned_date: "17-08-2020",
    grade: "0.2",
    id: 3,
  },
];

const columns: ColumnDef<IActivity>[] = [
  SelectColumn,
  SortingColumn("Fecha", "date"),
  GenericColumn("Slug", "slug"),
  GenericColumn("Tipo", "event_type"),
];

export default function Activities(): JSX.Element {
  // const [activities, setActivities] = useState<IActivity[]>(MockUpactivities);
  const { orgId } = useParams();
  const { activities, isLoading, createActivity } = useActivities(orgId);
  const [checkedActivities, setCheckedActivities] = useState<IRowSelection>({});
  const [formData, setFormData] = useState<IActivityField>({
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
      <h2 className="text-2xl font-bold text-center">
        IIC3585-1 Diseño Avanzado de Aplicaciones Web
      </h2>
      <hr className="w-3/4 border-input border-1" />
      <h3 className="text-xl font-medium text-center">Gestionar Actividades</h3>
      <div className="flex flex-col w-full">
        <div className="border border-slate-200 rounded-lg p-4 mb-4">
          <h3 className="text-lg font-medium">Añadir</h3>
          <div className="flex flex-row justify-center items-center relative space-x-4">
            <DatePicker
              date={formData.date}
              setDate={(date: Date) => setFormData({ ...formData, date })}
              className="my-4"
            />
            <Input
              name="slug"
              placeholder="Slug"
              className="my-4"
              value={formData.slug}
              onChange={handleChange}
            />
            <Input
              name="event_type"
              placeholder="Tipo de Actividad"
              className="my-4"
              type="number"
              value={formData.event_type}
              onChange={handleChange}
            />
            <Button onClick={addActivity}>Añadir</Button>
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
