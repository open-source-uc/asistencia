/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import client from "@/api/client";

export interface ActivityField {
  slug: string;
  date: Date;
  event_type: number;
}

export interface Activity extends ActivityField {
  id: string;
  course_id: string;
}

export const useActivities = (orgId: string = "") => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await client.get(`/courses/${orgId}/activities/`);
      setActivities(
        res.data
          .map((activity: Activity) => ({
            ...activity,
            date: new Date(activity.date),
          }))
          .sort((a: Activity, b: Activity) => {
            return b.date.getTime() - a.date.getTime();
          })
      );
      setIsLoading(false);
    };
    if (orgId) fetchData();
  }, [orgId]);

  const createActivity = async (values: ActivityField): Promise<void> => {
    const body = {
      // course_activity: {
      //   slug: values.slug,
      //   date: values.date.toISOString().replace("T", " ").replace("Z", ""),
      //   event_type: values.event_type,
      // },
      // allowed_roles: ["admin", "assistant", "default"],
      slug: values.slug,
      date: values.date.toISOString().replace("T", " ").replace("Z", ""),
      event_type: values.event_type,
    };
    const res = await client.post(`/courses/${orgId}/activities/`, body);
    console.log(res.data);
    const data = { ...res.data, date: new Date(res.data.date) };
    if (res.status === 200) setActivities([data, ...activities]);
  };

  return { activities, isLoading, createActivity };
};
