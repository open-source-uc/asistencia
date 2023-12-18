/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import client from "@/api/client";
import { useToast } from "@/components/ui/use-toast";

export interface ActivityField {
  name: string;
  slug: string;
  date: Date;
  description: string;
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
  deleteActivity: (activitySlug: string) => Promise<void>;
  deleteMultipleActivities: (activitySlugs: string[]) => Promise<void>;
} => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchData = async () => {
    setIsLoading(true);
    const res = await client.get(`/api/v1/courses/${orgId}/activities/`);
    setActivities(
      res.data.activities
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

  useEffect(() => {
    fetchData();
  }, []);

  const createActivity = async (values: ActivityField): Promise<void> => {
    const body = {
      name: values.name,
      slug: values.slug,
      description: values.description,
      date: new Date(values.date.getTime() + 86400000).toISOString(),
    };
    return await client
      .post(`/api/v1/courses/${orgId}/activities/`, body)
      .then((res) => {
        const activity = res.data.activity;
        setActivities((prev) =>
          [
            {
              ...activity,
              date: new Date(activity.date),
            },
            ...prev,
          ].sort((a: Activity, b: Activity) => {
            return b.date.getTime() - a.date.getTime();
          })
        );
        toast({
          title: "Actividad creada",
          description: "La actividad se ha creado correctamente.",
          variant: "success",
        });
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "Error al crear la actividad",
          description:
            "Ha ocurrido un error al crear la actividad. Revisa que el slug sea único.",
          variant: "destructive",
        });
      });
  };

  const deleteActivity = async (activitySlug: string): Promise<void> => {
    return await client
      .delete(`/api/v1/courses/${orgId}/activities/${activitySlug}`)
      .then(() => {
        setActivities((prev) => prev.filter((a) => a.slug !== activitySlug));
      });
  };

  const deleteMultipleActivities = async (
    activitySlugs: string[]
  ): Promise<void> => {
    activitySlugs.forEach(async (activitySlug) => {
      await deleteActivity(activitySlug);
    });
  };

  return {
    activities,
    isLoading,
    createActivity,
    deleteActivity,
    deleteMultipleActivities,
  };
};
