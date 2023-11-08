import { useState } from "react";
import { useStudents } from "@/hooks/useStudents";
import { useParams } from "react-router-dom";
import { SortingColumn } from "@/components/data-table";
import { DataTable } from "@/components/data-table";
import LoadingSpinner from "@/components/loading-spinner";
import { Button } from "@/components/ui/button";
import UploadFile from "@/components/upload-file";

// Array(8) [[ "Nombres", "Sección", "Curriculo", "Carrera", "EMail", "RUN", "Número de alumno\r" ], ...]

interface Student {
  attendance_id: string;
}

const columns = [SortingColumn("Código", "attendance_id")];
const columnsHash = [SortingColumn("Hash Estudiante", "attendance_id")];

export default function Students(): JSX.Element {
  // const [students, setStudents] = useState<Student[]>([]);
  const { orgId } = useParams();
  const { students, isLoading, createStudents } = useStudents(orgId || "");
  const [uploadedStudents, setUploadedStudents] = useState<Student[]>([]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      try {
        const file = e.target.files[0];
        const response = await fetch(URL.createObjectURL(file));
        const text = await response.text();
        const _data = text.split("\n").map((line) => line.split(","));
        const attendanceCodes = parseArray2(_data);
        setUploadedStudents(
          attendanceCodes.map((code) => ({ attendance_id: code, id: "" }))
        );
        // console.log(attendanceCodes);
        // createStudents(attendanceCodes);
        // setStudents(parseArray(_data, orgId || ""));
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <div className="space-y-6 flex flex-col items-center w-full">
      <h3 className="text-xl font-medium text-center">Gestionar Estudiantes</h3>
      <div className="flex flex-row items-center flex-wrap w-full justify-evenly bg-slate-50 rounded-xl">
        <UploadFile onChange={handleFileChange} />
        <div className="my-6 w-1/2 flex flex-col">
          <span className="text-sm text-slate-500 font-semibold mb-3">
            Vista previa
          </span>
          <DataTable columns={columns} data={uploadedStudents} />
          <Button
            onClick={() => {
              if (uploadedStudents.length > 0)
                createStudents(
                  uploadedStudents.map((student) => student.attendance_id)
                );
            }}
            isLoading={isLoading}
            className="w-full"
          >
            Añadir Estudiantes
          </Button>
        </div>
      </div>
      <div className="my-6 max-w-2xl">
        {isLoading && <LoadingSpinner />}
        {!isLoading && <DataTable columns={columnsHash} data={students} />}
      </div>
    </div>
  );
}

const parseArray = (array: string[][], course_id: string, id = "blala") => {
  const headerColumnNames = ["nombres", "nombre", "names", "name"];
  const runColumnNames = ["run", "rut"];
  const headerIndex = array[0].findIndex((column: string) =>
    headerColumnNames.includes(column.toLowerCase())
  );

  const runIndex = array[0].findIndex((column: string) =>
    runColumnNames.includes(column.toLowerCase())
  );

  if (headerIndex === -1) throw new Error("Names column not found");

  array.shift(); // remove the header
  const names = array.map((row) => row[headerIndex]);
  const repeatedNames = names.filter(
    (name, index) => names.indexOf(name) !== index
  );

  array = array.filter((row) => row[headerIndex] !== "");
  return array.map((row) => {
    const name = repeatedNames.includes(row[headerIndex])
      ? `${row[headerIndex]} (${row[runIndex]})`
      : row[headerIndex];
    return { attendance_id: `${name}`, id, course_id };
  });
};

const parseArray2 = (array: string[][]) => {
  const studentCode = ["número de alumno"];
  const studentCodeIndex = array[0].findIndex((column: string) =>
    studentCode.includes(column.toLowerCase().replace(/\r/g, ""))
  );
  array.shift();
  const studentCodes = array
    .map((row) => row[studentCodeIndex])
    .filter((code) => code !== "" && code !== undefined)
    .map((code) => code.replace(/\r/g, ""));
  return studentCodes;
};
