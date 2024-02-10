import client from "@/api/client";
import type { Activity } from "./types";

const basePath = "api/v1/courses";

export const useActivitiesRequests = (orgId: string) => {
  const activitiesQuery = async (): Promise<Activity[]> => {
    const res = await client.get(`${basePath}/${orgId}/activities/`);
    return res.data.activities
      .map((activity: Activity) => ({
        ...activity,
        date: new Date(activity.date),
      }))
      .sort((a: Activity, b: Activity) => {
        return b.date.getTime() - a.date.getTime();
      });
  };

  const createActivity = async (
    name: string,
    slug: string,
    description: string,
    date: Date
  ): Promise<Activity> => {
    return await client.post(`/api/v1/courses/${orgId}/activities/`, {
      name,
      slug,
      description,
      date,
    });
  };

  const deleteActivity = async (activitySlug: string): Promise<void> => {
    await client.delete(`/api/v1/courses/${orgId}/activities/${activitySlug}`);
  };

  const deleteMultipleActivities = async (
    activitySlugs: string[]
  ): Promise<void> => {
    activitySlugs.forEach((activitySlug) => {
      deleteActivity(activitySlug);
    });
  };

  return {
    activitiesQuery,
    createActivity,
    deleteActivity,
    deleteMultipleActivities,
  };
};
