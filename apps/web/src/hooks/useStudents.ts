import { useState, useEffect } from "react";
import { useUserSession } from "./useUserSession";
import { clientHash } from "@/lib/hashFunctions";
import axios from "axios";

interface Student {
  id: string;
  attendance_id: string;
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

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/courses/${orgId}/students/`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${userSession.access_token}`,
          },
        }
      );
      const data = await res.data;
      setStudents(data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const createStudents = async (studentCodes: string[]) => {
    const studentIds = studentCodes.map((studentCode) =>
      clientHash(studentCode, orgId)
    );
    console.log(studentIds);
    const body = {
      course_id: orgId,
      attendance_codes: studentIds,
    };
    console.log(body);
    // const res = await axios.post(
    //   `${import.meta.env.VITE_API_URL}/courses/${orgId}/students/`,
    //   body,
    //   {
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${userSession.access_token}`,
    //     },
    //   }
    // );
    // setStudents([...students, ...res.data]);
  };

  return { students, isLoading, setStudents, createStudents };
};
