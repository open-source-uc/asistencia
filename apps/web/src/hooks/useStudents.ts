/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import axios from "axios";

interface IStudent {
  id: string;
  attendance_id: string;
  course_id: string;
}

export const useStudents = (
  orgId: string | undefined
): {
  students: IStudent[];
  isLoading: boolean;
  setStudents: React.Dispatch<React.SetStateAction<IStudent[]>>;
} => {
  const [students, setStudents] = useState<IStudent[]>([]);
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
