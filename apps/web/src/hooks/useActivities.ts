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

export const useActivities = (
  orgId: string = ""
): {
  activities: Activity[];
  isLoading: boolean;
  createActivity: (values: ActivityField) => Promise<void>;
} => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    const res = await client.get(`/courses/${orgId}/activities/`);
    setActivities(
      res.data
        .map((activity: Activity) => ({
          ...activity,
          date: new Date(activity.date + "Z"),
        }))
        .sort((a: Activity, b: Activity) => {
          return b.date.getTime() - a.date.getTime();
        })
    );
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
    return await client
      .post(`/courses/${orgId}/activities/`, body)
      .then((res) => {
        setActivities((prev) =>
          [
            {
              ...res.data,
              date: new Date(res.data.date + "Z"),
            },
            ...prev,
          ].sort((a: Activity, b: Activity) => {
            return b.date.getTime() - a.date.getTime();
          })
        );
      });
  };

  return { activities, isLoading, createActivity };
};
