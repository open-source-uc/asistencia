import { Button } from "@/components/ui/button";
import { useState } from "react";
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

interface IActivity {
  id: number;
  slug: string;
  name: string;
  planned_date: string;
  grade: string;
}

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
  SortingColumn("Fecha", "planned_date"),
  GenericColumn("Nombre", "name"),
  GenericColumn("Ponderación", "grade"),
];

export default function Activities(): JSX.Element {
  const [activities, setActivities] = useState<IActivity[]>(MockUpactivities);
  const [checkedActivities, setCheckedActivities] = useState<IRowSelection>({});
  const [formData, setFormData] = useState({
    date: new Date(),
    name: "",
    grade: "",
  });

  const removeActivities = (activities: IRowSelection) => {
    console.log("removed", activities);
  };

  const addActivity = () => {
    console.log("added", formData);
    setActivities([
      ...activities,
      {
        id: activities.length + 1,
        slug: formData.name,
        name: formData.name,
        planned_date: formData.date.toLocaleDateString(),
        grade: formData.grade,
      },
    ]);
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
              placeholder="Nombre"
              className="my-4"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <Input
              placeholder="Ponderación"
              className="my-4"
              value={formData.grade}
              onChange={(e) => {
                let value = e.target.value;
                if (parseFloat(value) > 1) value = "1";
                if (parseFloat(value) < 0) value = "0";
                setFormData({ ...formData, grade: value });
              }}
              type="number"
              step={0.01}
              min={0}
              max={1}
            />
            <Button onClick={addActivity}>Añadir</Button>
          </div>
        </div>
        <DataTable
          data={activities}
          columns={columns}
          rowSelection={checkedActivities}
          setRowSelection={setCheckedActivities}
        />
      </div>
      <div className="flex flex-row justify-end items-center">
        <RemoveDialog onRemove={() => removeActivities(checkedActivities)} />
      </div>
    </div>
  );
}
