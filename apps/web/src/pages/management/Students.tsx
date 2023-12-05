import { useState } from "react";
import { useStudents } from "@/hooks/useStudents";
import { useParams } from "react-router-dom";
import { SortingColumn, DataTable } from "@/components/data-table";
import LoadingSpinner from "@/components/loading-spinner";
import ImportStudents from "@/components/import-students";
import InputPills from "@/components/input-pills";
import { Button } from "@/components/ui/button";
import type { OrgData } from "@/types/interfaces";
import { UserType } from "@/types/enums";

const columnsHash = [SortingColumn("Hash Estudiante", "attendance_id")];

interface Value {
  pills: Set<string>;
  lastInputState: string;
}

export default function Students({
  orgData,
}: {
  orgData: OrgData;
}): JSX.Element {
  const { orgId } = useParams();
  const { students, isLoading, createStudents } = useStudents(orgId);
  const [inputState, setInputState] = useState<Value>({
    pills: new Set(),
    lastInputState: "",
  });

  const addStudentsManually = () => {
    if (inputState.pills.size === 0 && inputState.lastInputState === "") return;
    const studentCodes = Array.from(inputState.pills);
    if (inputState.lastInputState !== "")
      studentCodes.push(inputState.lastInputState);
    createStudents(studentCodes);
    setInputState({ pills: new Set(), lastInputState: "" });
  };
  return (
    <div className="space-y-6 flex flex-col items-center w-full">
      <h3 className="text-xl font-medium text-center">Gestionar Estudiantes</h3>
      {!(orgData.userType === UserType.VIEWER) && (
        <>
          <div className="flex flex-col p-6 bg-slate-50">
            <span className="text-md font-medium mb-3">
              Agregar estudiantes manualmente
            </span>
            <span className="text-sm mb-2 max-w-lg">
              Puedes agregar estudiantes manualmente ingresando su identificador
              único. Este puede ser su número de alumno, correo institucional o
              lo que estimes conveniente.
            </span>
            <div className="flex flex-row justify-center items-end relative mt-4">
              <InputPills
                placeholder="Identificador de estudiante 1, Identificador de Estudiante 2, ..."
                onChange={(value: Value) => {
                  setInputState(value);
                }}
                value={inputState}
              />
              <Button
                onClick={addStudentsManually}
                className="h-16"
                isLoading={isLoading}
              >
                Añadir
              </Button>
            </div>
          </div>
          <div className="flex flex-col p-6 bg-slate-50">
            <span className="text-md font-medium mb-6">
              Importar estudiantes desde un archivo
            </span>
            <ImportStudents
              isLoadingStudents={isLoading}
              createStudents={createStudents}
            />
          </div>
        </>
      )}
      <h3 className="text-xl font-medium text-center">
        Estudiantes Registrados
      </h3>
      <div className="my-6 max-w-2xl">
        {isLoading && <LoadingSpinner />}
        {!isLoading && <DataTable columns={columnsHash} data={students} />}
      </div>
    </div>
  );
}
