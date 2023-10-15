import { useState, useEffect } from "react";

export const useActivities = (orgId: string | undefined) => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/courses/${orgId}/activities`
      );
      const data = await res.json();
      console.log(data);
      setActivities(data);
    };
    if (orgId) fetchData();
  }, [orgId]);

  return { activities };
};
