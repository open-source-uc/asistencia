import type { Activity } from "@/types/interfaces";

export const useDataTransforms = () => {
  const mapActivities = (activities: Activity[]) => {
    return activities
      .map((activity: Activity) => ({
        ...activity,
        date: new Date(activity.date),
      }))
      .sort((a: Activity, b: Activity) => {
        return b.date.getTime() - a.date.getTime();
      });
  };

  return {
    mapActivities,
  };
};
