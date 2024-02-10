import client from "@/api/client";
import type { Activity } from "./types";

const basePath = "api/v1/courses";

export const useActivitiesRequests = (orgId: string) => {
  const activitiesQuery = async () => {
    const res = await client.get(`${basePath}/${orgId}/activities/`);
    res.data.activities
        .map((activity: Activity) => ({
          ...activity,
          date: new Date(activity.date),
        }))
        .sort((a: Activity, b: Activity) => {
          return b.date.getTime() - a.date.getTime();
        })
  };

  return {
    activitiesQuery,
  };
};
