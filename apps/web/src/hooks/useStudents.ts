/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { clientHash } from "@/lib/hashFunctions";
import client from "@/api/client";
import { useToast } from "@/components/ui/use-toast";

interface RequestObject {
  students: ResponseObject[];
}

interface ResponseObject {
  id: string;
  attendance_codes: string[];
  course_id: string;
  created_at: string;
  display_name: string;
  updated_at: string;
}

interface Student {
  display_name?: string;
  attendance_codes: string[];
}

export const useStudents = (
  orgId: string = ""
): {
  students: Student[];
  isLoading: boolean;
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
  createStudent: (studentCodes: string[], displayName: string) => Promise<void>;
  createMultipleStudents: (studentsRequest: Student[]) => Promise<void>;
} => {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await client.get<RequestObject>(
        `/api/v1/courses/${orgId}/students/`
      );
      setStudents(res.data.students);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const createStudent = async (studentCodes: string[], displayName: string) => {
    const studentIds = await Promise.all(
      studentCodes.map(
        (studentCode: string): Promise<string> => clientHash(studentCode, orgId)
      )
    );
    let body: Student = { attendance_codes: studentIds };
    if (displayName !== "") {
      body = { ...body, display_name: displayName };
    }
    setIsLoading(true);
    await client
      .post(`api/v1/courses/${orgId}/students/`, body)
      .then((res) => {
        setStudents([...students, res.data.student]);
        setIsLoading(false);
        toast({
          title: "Estudiante agregado",
          description: "El estudiante ha sido agregado correctamente.",
          variant: "success",
        });
      })
      .catch(() => {
        setIsLoading(false);
        toast({
          title: "Error al agregar estudiante",
          description: "Ha ocurrido un error inesperado.",
          variant: "destructive",
        });
      });
  };

  const createMultipleStudents = async (studentsRequest: Student[]) => {
    const studentsWithHash = await Promise.all(
      studentsRequest.map(
        async (student: Student): Promise<Student> => ({
          ...student,
          attendance_codes: await Promise.all(
            student.attendance_codes.map(
              (attendanceCode: string): Promise<string> =>
                clientHash(attendanceCode, orgId)
            )
          ),
        })
      )
    );
    const body = { students: studentsWithHash };
    setIsLoading(true);
    await client
      .post(`api/v1/courses/${orgId}/students/batch_create`, body)
      .then((res) => {
        setStudents([...res.data.students]);
        setIsLoading(false);
        toast({
          title: "Estudiantes agregados",
          description: "Los estudiantes se han agregado correctamente.",
          variant: "success",
        });
      })
      .catch(() => {
        setIsLoading(false);
        toast({
          title: "Error al agregar estudiantes",
          description: "Ha ocurrido un error al agregar los estudiantes.",
          variant: "destructive",
        });
      });
  };

  return {
    students,
    isLoading,
    setStudents,
    createStudent,
    createMultipleStudents,
  };
};
