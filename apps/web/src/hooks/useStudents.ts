import { useState, useEffect } from "react";
import axios from "axios";

interface Student {
  id: string;
  attendance_id: string;
  course_id: string;
}

export const useStudents = (
  orgId: string | undefined
): {
  students: Student[];
  isLoading: boolean;
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
} => {
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
          },
        }
      );
      const data = await res.data;
      setStudents(data);
      setIsLoading(false);
    };
    if (orgId) fetchData();
  }, [orgId]);

  return { students, isLoading, setStudents };
};
