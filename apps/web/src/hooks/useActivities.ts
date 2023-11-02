import { useState, useEffect } from "react";
import axios from "axios";

export interface ActivityField {
  slug: string;
  date: Date;
  event_type: number;
}

export interface Activity extends ActivityField {
  id: string;
  course_id: string;
}

export const useActivities = (orgId: string | undefined) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/courses/${orgId}/activities/`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      setActivities(
        res.data
          .map((activity: Activity) => ({
            ...activity,
            date: new Date(activity.date),
          }))
          .sort((a: Activity, b: Activity) => {
            return  b.date.getTime() - a.date.getTime();
          })
      );
      setIsLoading(false);
    };
    if (orgId) fetchData();
  }, [orgId]);

  const createActivity = async (values: ActivityField): Promise<void> => {
    const body = {
      slug: values.slug,
      date: values.date.toISOString().replace("T", " ").replace("Z", ""),
      event_type: values.event_type,
    };
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/courses/${orgId}/activities/`,
      body,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res.data);
    const data = { ...res.data, date: new Date(res.data.date) };
    if (res.status === 200) setActivities([data, ...activities]);
  };

  return { activities, isLoading, createActivity };
};
