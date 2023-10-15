import { useState, useEffect } from "react";

export const useStudents = (orgId: string | undefined) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/courses/${orgId}/students`
      );
      const data = await res.json();
      console.log(data);
      setStudents(data);
    };
    if (orgId) fetchData();
  }, [orgId]);

  return { students };
};
