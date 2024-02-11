import client from "@/api/client";
import type { Activity } from "@/types/interfaces";

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
    date: string
  ): Promise<Activity> => {
    const res = await client.post(`${basePath}/${orgId}/activities/`, {
      name,
      slug,
      description,
      date,
    });
    return res.data.activity;
  };

  const deleteActivity = async (slug: string): Promise<void> => {
    await client.delete(`${basePath}/${orgId}/activities/${slug}`);
  };

  const deleteMultipleActivities = async (slugs: string[]): Promise<void> => {
    await Promise.all(
      slugs.map(async (slug) => {
        await deleteActivity(slug);
      })
    );
  };

  return {
    activitiesQuery,
    createActivity,
    deleteActivity,
    deleteMultipleActivities,
  };
};
