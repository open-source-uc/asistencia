import { useState, useEffect } from "react";
import axios from "axios";

export const useAssistants = (orgId: string | undefined) => {
  const [assistants, setAssistants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/courses/${orgId}/assistants/`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      const data = res.data;
      setAssistants(data);
      setIsLoading(false);
    };
    if (orgId) fetchData();
  }, [orgId]);

  return { assistants, isLoading };
};
