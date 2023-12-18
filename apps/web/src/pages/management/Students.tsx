import { useStudents } from "@/hooks/useStudents";
import { useParams } from "react-router-dom";
import { DataTable, SortingColumn, ArrayColumn } from "@/components/data-table";
import LoadingSpinner from "@/components/loading-spinner";
import ImportStudents from "@/components/forms/import-students";
import type { OrgData } from "@/types/interfaces";
import { UserType } from "@/types/enums";
import { AddStudentsForm } from "@/components/forms/add-students-form";

const columnsHash = [
  SortingColumn("Nombre", "display_name"),
  ArrayColumn("Hashes Estudiante", "attendance_codes"),
];

export default function Students({
  orgData,
}: {
  orgData: OrgData;
}): JSX.Element {
  const { orgId } = useParams();
  const { students, isLoading, createStudent, createMultipleStudents } =
    useStudents(orgId);

  return (
    <div className="space-y-6 flex flex-col items-center w-full">
      <h3 className="text-xl font-medium text-center">Gestionar Estudiantes</h3>
      {!(orgData.userType === UserType.VIEWER) && (
        <>
          <div className="flex flex-col p-6 bg-slate-50">
            <span className="text-md font-medium mb-3">Agregar estudiante</span>
            <span className="text-sm mb-2 max-w-lg">
              Para incorporar un estudiante manualmente, ingresa sus
              identificadores únicos (puede ser más de uno separado por punto y
              coma). Estos pueden ser su número de alumno, correo institucional
              o lo que estimes conveniente.
            </span>
            <AddStudentsForm createStudent={createStudent} />
          </div>
          <div className="flex flex-col p-6 bg-slate-50">
            <span className="text-md font-medium mb-6">
              Importar estudiantes desde un archivo
            </span>
            <ImportStudents
              isLoadingStudents={isLoading}
              createStudents={createMultipleStudents}
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
