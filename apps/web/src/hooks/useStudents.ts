import {
  useStudentsQuery,
  useStudentsMutations,
  CreateStudent,
} from "./queries/useStudents";
import { useToast } from "@/components/ui/use-toast";

export const useStudents = (orgId: string = "") => {
  const { toast } = useToast();
  const students = useStudentsQuery(orgId);

  const getStudents = () => {
    return students.data || [];
  };

  const {
    createStudent: createStudentMutation,
    createMultipleStudents: createMultipleStudentsMutation,
  } = useStudentsMutations(orgId);

  const createStudent = async (studentCodes: string[], displayName: string) => {
    createStudentMutation.mutateAsync(
      {
        attendance_codes: studentCodes,
        display_name: displayName,
      },
      {
        onError: () => {
          toast({
            title: "Error al agregar estudiante",
            description: "Ha ocurrido un error inesperado.",
            variant: "destructive",
          });
        },
        onSuccess: () => {
          toast({
            title: "Estudiante agregado",
            description: "El estudiante ha sido agregado correctamente.",
            variant: "success",
          });
        },
      }
    );
  };
  const createMultipleStudents = async (studentsRequest: CreateStudent[]) => {
    createMultipleStudentsMutation.mutateAsync(studentsRequest, {
      onError: () => {
        toast({
          title: "Error al agregar estudiantes",
          description: "Ha ocurrido un error al agregar los estudiantes.",
          variant: "destructive",
        });
      },
      onSuccess: () => {
        toast({
          title: "Estudiantes agregados",
          description: "Los estudiantes se han agregado correctamente.",
          variant: "success",
        });
      },
    });
  };

  return {
    students,
    getStudents,
    createStudent,
    createMultipleStudents,
  };
};
