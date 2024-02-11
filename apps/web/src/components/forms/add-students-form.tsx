import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import InputPills, { type Value } from "../input-pills";

interface Student {
  name: string;
  value: Value;
}

export const AddStudentsForm = ({
  isLoading,
  createStudent,
}: {
  isLoading: boolean;
  createStudent: (code: string[], name: string) => void;
}) => {
  const [formState, setFormState] = useState<Student>({
    name: "",
    value: {
      pills: new Set(),
      lastInputState: "",
    },
  });

  const addStudent = () => {
    if (
      formState.value.pills.size === 0 &&
      formState.value.lastInputState === ""
    )
      return;
    const studentCodes = Array.from(formState.value.pills);
    if (formState.value.lastInputState !== "")
      studentCodes.push(formState.value.lastInputState);
    createStudent(studentCodes, formState.name);
    setFormState({
      name: "",
      value: {
        pills: new Set(),
        lastInputState: "",
      },
    });
  };

  return (
    <div className="flex flex-col gap-2 my-2">
      <div className="flex flex-col gap-2">
        <Input
          placeholder="Nombre (opcional)"
          name="name"
          value={formState.name}
          onChange={(e) => {
            setFormState({
              ...formState,
              name: e.target.value,
            });
          }}
        />
        <InputPills
          placeholder="Identificador 1 Estudiante; Identificador 2 Estudiante, ..."
          separators={[";"]}
          onChange={(value) => {
            setFormState({
              ...formState,
              value: value,
            });
          }}
          value={formState.value}
        />
        <Button
          className="mt-2 w-36"
          onClick={addStudent}
          isLoading={isLoading}
        >
          Agregar
        </Button>
      </div>
    </div>
  );
};
