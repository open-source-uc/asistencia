import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import UploadFile from "@/components/upload-file";
import Stepper from "@/components/stepper";
import { type ColumnDef } from "@tanstack/react-table";
import { Combobox } from "@/components/ui/combobox";
import { Separator } from "@/components/ui/separator";
import LoadingSpinner from "@/components/loading-spinner";
import { SortingColumn, DataTable } from "@/components/data-table";

interface Student {
  attendance_id: string;
}

interface UploadedData {
  array: { [key: string]: string }[];
  headers: string[];
  columns: ColumnDef<unknown>[];
}

const columnsSelectedColumn = [SortingColumn("Identificador", "attendance_id")];

export default function ImportStudents({
  isLoadingStudents,
  createStudents,
}: {
  isLoadingStudents: boolean;
  createStudents: (studentCodes: string[]) => void;
}): JSX.Element {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoadingUpload, setIsLoadingUpload] = useState(false);
  const [uploadedData, setUploadedData] = useState<UploadedData>({
    array: [],
    headers: [],
    columns: [],
  });
  const [selectedColumn, setSelectedColumn] = useState<string>("");
  const [studentCodes, setStudentCodes] = useState<Student[]>([]);
  useEffect(() => {
    if (selectedColumn !== "") {
      const studentCodes = uploadedData.array.map((row) => ({
        attendance_id: row[selectedColumn],
      }));
      setStudentCodes(studentCodes);
    }
  }, [selectedColumn, uploadedData]);
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoadingUpload(true);
    if (e.target.files) {
      try {
        const file = e.target.files[0];
        const response = await fetch(URL.createObjectURL(file));
        const text = await response.text();
        const { array, headers, columns } = parseCSV(text);
        setUploadedData({ array, headers, columns });
        setCurrentStep(1);
        setIsLoadingUpload(false);
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center">
        <div className="flex flex-col lg:flex-row lg:space-y-0 space-y-4 justify-center items-center">
          <Stepper
            steps={["Subir CSV", "Elegir Columna", "Añadir"]}
            currentStep={currentStep}
            className="mx-4"
          />
          <div className="flex flex-row space-x-4 ml-4">
            <Button
              onClick={() => {
                if (currentStep > 0) {
                  setCurrentStep(currentStep - 1);
                }
              }}
              disabled={currentStep === 0}
              variant={"outline"}
            >
              Anterior
            </Button>
            <Button
              variant={"noshadow"}
              onClick={() => {
                if (currentStep < 2) {
                  setCurrentStep(currentStep + 1);
                }
              }}
              disabled={currentStep === 2}
            >
              Siguiente
            </Button>
          </div>
        </div>
        <Separator className="my-8 w-3/4" />
      </div>
      {isLoadingUpload && (
        <div className="h-96 flex items-center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoadingUpload && (
        <div>
          {currentStep === 0 && (
            <div className="flex items-center justify-center">
              <UploadFile onChange={handleFileChange} />
            </div>
          )}
          {currentStep === 1 && (
            <div className="flex flex-col items-center space-y-4 w-full">
              <div className="flex flex-col lg:flex-row lg:space-y-0 space-y-4 justify-center items-center space-x-6">
                <span className="text-sm lg:w-96 w-64">
                  Selecciona la columna que deseas utilizar para medir la
                  asistencia de los estudiantes.
                </span>
                <Combobox
                  placeholder="Seleccionar columna"
                  searchPlaceholder="Buscar columna..."
                  items={uploadedData.headers.map((header) => ({
                    label: header,
                    value: header,
                  }))}
                  value={selectedColumn}
                  onChange={(value) => {
                    setSelectedColumn(value);
                  }}
                />
              </div>
              <span className="text-sm text-slate-500 font-semibold mb-3">
                Datos originales
              </span>
              <DataTable
                className="bg-white xl:w-full lg:max-w-2xl max-w-xs"
                columns={uploadedData.columns}
                data={uploadedData.array}
              />
            </div>
          )}
          {currentStep === 2 && (
            <div className="flex flex-col lg:flex-row lg:space-y-0 space-y-4 justify-around items-center w-full space-x-6">
              <div className="my-6 flex flex-col">
                <span className="text-sm text-slate-500 font-semibold mb-3">
                  Vista previa
                </span>
                <DataTable
                  columns={columnsSelectedColumn}
                  data={studentCodes}
                  className="bg-white lg:w-auto w-64"
                />
              </div>
              <div className="text-sm lg:w-96 w-64 flex flex-col space-y-4 items-center">
                <span>
                  Si no estás seguro de que los datos sean correctos , puedes
                  volver atrás y elegir otra columna.
                </span>
                <Button
                  className="w-64"
                  onClick={() => {
                    if (studentCodes.length > 0)
                      createStudents(
                        studentCodes.map((student) => student.attendance_id)
                      );
                  }}
                  isLoading={isLoadingStudents}
                  disabled={studentCodes.length === 0}
                >
                  Añadir Estudiantes
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const parseCSV = (csv: string): UploadedData => {
  const lines = csv.split("\n").filter((line) => line !== "");
  const headers = lines[0].split(",");
  const columns = headers.map((header) => SortingColumn(header, header));
  // make array of objects with headers as keys
  const array = lines.slice(1).map((line) => {
    const obj: { [key: string]: string } = {};
    const currentline = line.split(",");
    headers.forEach((header: string, i: number) => {
      obj[header] = currentline[i].replace(/\r/g, "");
    });
    return obj;
  });
  return {
    array,
    headers,
    columns,
  };
};
