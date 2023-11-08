import { useState, useEffect } from "react";
import { useUserSession } from "./useUserSession";
import { clientHash } from "@/lib/hashFunctions";
import axios from "axios";

interface Student {
  // id: string;
  // course_id: string;
  attendance_id: string;
}

interface RequestObject {
  id: string;
  attendance_codes: string[];
  course_id: string;
}

export const useStudents = (
  orgId: string
): {
  students: Student[];
  isLoading: boolean;
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
  createStudents: (codes: string[]) => Promise<void>;
} => {
  const { userSession } = useUserSession();
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
      const res = await axios.get<RequestObject[]>(
        `${import.meta.env.VITE_API_URL}/courses/${orgId}/students/`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${userSession.access_token}`,
          },
        }
      );
      const array: Student[] = [];
      res.data.forEach((obj: RequestObject) => {
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
    // console.log(studentIds);
    const body = {
      course_id: orgId,
      attendance_codes: studentIds,
    };
    await axios
      .post(
        `${import.meta.env.VITE_API_URL}/courses/${orgId}/students/`,
        body,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${userSession.access_token}`,
          },
        }
      )
      .then((res) =>
        setStudents([
          ...students,
          ...formatDataToStudent(res.data.attendance_codes),
        ])
      );
  };

  return { students, isLoading, setStudents, createStudents };
};
