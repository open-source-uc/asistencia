import { useState, useEffect } from "react";

export const useAssistants = (orgId: string | undefined) => {
  const [assistants, setAssistants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/courses/${orgId}/students`
      );
      const data = await res.json();
      console.log(data);
      setAssistants(data);
    };
    if (orgId) fetchData();
  }, [orgId]);

  return { assistants };
};
