import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import CheckboxSelect from "@/components/checkbox-select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

const assistants = [
  "alfredo.medina@uc.cl",
  "benjavicente@uc.cl",
  "cparedesr@uc.cl",
  "ignacio.porte@uc.cl",
  "alfredo.medina@uc.cl",
  "benjavicente@uc.cl",
  "cparedesr@uc.cl",
  "ignacio.porte@uc.cl",
  "alfredo.medina@uc.cl",
  "benjavicente@uc.cl",
  "cparedesr@uc.cl",
  "ignacio.porte@uc.cl",
];

export default function Assistants(): JSX.Element {
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [checkedAssistants, setCheckedAssistants] = useState<number[]>([]);

  const toggleChecked = (index: number) => {
    if (checkedAssistants.includes(index)) {
      setCheckedAssistants(
        checkedAssistants.filter((assistant) => assistant !== index)
      );
    } else {
      setCheckedAssistants([...checkedAssistants, index]);
    }
  };

  useEffect(() => {
    if (selectAllChecked) {
      setCheckedAssistants(assistants.map((_, i) => i));
    } else {
      setCheckedAssistants([]);
    }
  }, [selectAllChecked]);

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
        <ScrollArea className="my-6 shadow-b-inner p-4">
          <div className="flex flex-col space-y-4 max-h-96">
            {assistants.map((assistant, i) => (
              <CheckboxSelect
                key={i}
                index={i + 1}
                text={assistant}
                className="font-normal"
                checked={checkedAssistants.includes(i)}
                toggleChecked={() => {
                  toggleChecked(i);
                }}
              />
            ))}
          </div>
        </ScrollArea>
        <div className="flex flex-row justify-between">
          <CheckboxSelect
            text="Seleccionar todos"
            checked={selectAllChecked}
            className="justify-center"
            toggleChecked={() => {
              setSelectAllChecked(!selectAllChecked);
            }}
          />
          <Button variant={"roundedoutline"}>Remover</Button>
        </div>
      </div>
    </div>
  );
}
