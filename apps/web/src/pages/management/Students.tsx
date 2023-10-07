import { ScrollArea } from "@/components/ui/scroll-area";

const students = [
  "Alfredo Medina",
  "Benjamín Vicente",
  "Carlos Paredes",
  "Ignacio Porte",
  "Alfredo Medina",
  "Benjamín Vicente",
  "Carlos Paredes",
  "Ignacio Porte",
];

export default function Students(): JSX.Element {
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
            <input type="file" className="hidden" accept=".csv" />
          </label>
        </div>
        <ScrollArea className="my-6 md:w-1/2">
          <div className="space-y-4 max-h-96">
            {students.map((student, i) => (
              <div
                key={i}
                className="rounded-full border border-input px-4 py-2 flex items-center space-x-2 cursor-pointer transition-all select-none hover:bg-input"
              >
                <span className="w-4 ml-2">{i + 1}</span>
                <span>{student}</span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
