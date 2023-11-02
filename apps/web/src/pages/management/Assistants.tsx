import { useState } from "react";
// import { useParams } from "react-router-dom";
// import { useAssistants } from "@/hooks/useAssistants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RemoveDialog } from "@/components/remove-dialog";
import {
  DataTable,
  SelectColumn,
  SortingColumn,
  IRowSelection,
} from "@/components/data-table";

const data: IAssistant[] = [
  { email: "ken99@yahoo.com" },
  { email: "Abe45@gmail.com" },
  { email: "Monserrat44@gmail.com" },
  { email: "Silas22@gmail.com" },
  { email: "carmella@hotmail.com" },
  { email: "alfredo.medina@uc.cl" },
  { email: "benjavicente@uc.cl" },
  { email: "cparedesr@uc.cl" },
  { email: "ignacio.porte@uc.cl" },
  { email: "alfredo.medina@uc.cl" },
  { email: "benjavicente@uc.cl" },
  { email: "cparedesr@uc.cl" },
  { email: "ignacio.porte@uc.cl" },
];

type IAssistant = {
  email: string;
};

const columns = [SelectColumn, SortingColumn("Email", "email")];

export default function Assistants(): JSX.Element {
  // const { orgId } = useParams();
  // const {assistants, isLoading} = useAssistants(orgId);
  const [checkedAssistants, setCheckedAssistants] = useState<IRowSelection>({});

  const removeAssistant = (assistants: IRowSelection) => {
    console.log("removed", assistants);
  };

  return (
    <div className="space-y-6 flex flex-col items-center px-4">
      <h2 className="text-2xl font-bold text-center">
        IIC3585-1 Diseño Avanzado de Aplicaciones Web
      </h2>
      <hr className="w-3/4 border-input border-1" />
      <h3 className="text-xl font-medium text-center">Gestionar Ayudantes</h3>
      <div className="flex flex-col w-full">
        <h3 className="text-xl font-medium">Añadir</h3>
        <div className="flex flex-row justify-center items-center relative">
          <Input
            placeholder="ejemplo@uc.cl"
            className="my-4"
            variant={"rounded"}
          />
          <Button variant={"rounded"}>Añadir</Button>
        </div>
        <DataTable
          data={data}
          columns={columns}
          rowSelection={checkedAssistants}
          setRowSelection={setCheckedAssistants}
        />
        <div className="flex flex-row justify-end items-center my-4">
          <RemoveDialog onRemove={() => removeAssistant(checkedAssistants)} />
        </div>
      </div>
    </div>
  );
}
