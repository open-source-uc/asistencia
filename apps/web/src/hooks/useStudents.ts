/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { clientHash } from "@/lib/hashFunctions";
import client from "@/api/client";
import { useToast } from "@/components/ui/use-toast";

interface Student {
  attendance_id: string;
}

interface RequestObject {
  students: ResponseObject[];
}

interface ResponseObject {
  id: string;
  attendance_codes: string[];
  course_id: string;
}

export const useStudents = (
  orgId: string = ""
): {
  students: Student[];
  isLoading: boolean;
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
  createStudents: (codes: string[]) => Promise<void>;
} => {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const formatDataToStudent = (data: string[]): Student[] => {
    return data.map((code) => {
      return {
        attendance_id: code,
      };
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await client.get<RequestObject>(
        `/api/v1/courses/${orgId}/students/`
      );
      const array: Student[] = [];
      res.data.students.forEach((obj: ResponseObject) => {
        array.push(...formatDataToStudent(obj.attendance_codes));
      });
      setStudents(array);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const createStudents = async (studentCodes: string[]) => {
    const studentIds = await Promise.all(
      studentCodes.map(
        (studentCode: string): Promise<string> => clientHash(studentCode, orgId)
      )
    );
    const body = {
      attendance_codes: studentIds,
    };
    setIsLoading(true);
    await client
      .post(`api/v1/courses/${orgId}/students/`, body)
      .then((res) => {
        setStudents([
          ...students,
          ...formatDataToStudent(res.data.student.attendance_codes),
        ]);
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

  return { students, isLoading, setStudents, createStudents };
};
