import { useStudents } from "@/hooks/useStudents";
import { useParams } from "react-router-dom";
import { SortingColumn } from "@/components/data-table";
import { DataTable } from "@/components/data-table";
import LoadingSpinner from "@/components/loading-spinner";

// Array(8) [[ "Nombres", "Sección", "Curriculo", "Carrera", "EMail", "RUN", "Número de alumno\r" ], ...]

const columns = [SortingColumn("Nombre", "attendance_id")];

export default function Students(): JSX.Element {
  // const [students, setStudents] = useState<Student[]>([]);
  const { orgId } = useParams();
  const { students, setStudents, isLoading } = useStudents(orgId);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      try {
        const file = e.target.files[0];
        const response = await fetch(URL.createObjectURL(file));
        const text = await response.text();
        const _data = text.split("\n").map((line) => line.split(","));
        setStudents(parseArray(_data, orgId || ""));
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <div className="space-y-6 flex flex-col items-center w-full">
      <h2 className="text-2xl font-bold text-center">
        IIC3585-1 Diseño Avanzado de Aplicaciones Web
      </h2>
      <hr className="w-3/4 border-input border" />
      <h3 className="text-xl font-medium text-center">Gestionar Estudiantes</h3>
      <div className="flex flex-row items-center flex-wrap w-full justify-evenly">
        <div className="flex items-center justify-center h-96">
          <label className="rounded-xl flex flex-col items-center justify-center h-64 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
            <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4">
              <p className="mb-2 text-sm text-slate-500 font-semibold">
                Arrastra y suelta tu archivo .csv
              </p>
              <p className="text-xs text-slate-500">CSV, XLS</p>
            </div>
            <input
              type="file"
              className="hidden"
              accept=".csv"
              onChange={(e) => handleFileChange(e)}
            />
          </label>
        </div>
        <div className="my-6 w-1/2">
          {isLoading && <LoadingSpinner />}
          {!isLoading && <DataTable columns={columns} data={students} />}
        </div>
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
