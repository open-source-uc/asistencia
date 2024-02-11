import {
  useActivitiesQuery,
  useActivitiesMutations,
} from "./queries/useActivities";
import { useToast } from "@/components/ui/use-toast";
import type { CreateActivity } from "@/types/interfaces";

export const useActivities = (orgId: string = "") => {
  const { toast } = useToast();
  const activities = useActivitiesQuery(orgId);

  const getActivities = () => {
    return activities.data || [];
  };

  const activitiesMutations = useActivitiesMutations(orgId);
  const {
    createActivity: createActivityMutation,
    deleteActivity: deleteActivityMutation,
    deleteMultipleActivities: deleteMultipleActivitiesMutation,
  } = activitiesMutations;

  const createActivity = (values: CreateActivity) => {
    const body = {
      name: values.name,
      slug: values.slug,
      description: values.description,
      date: new Date(values.date.getTime() + 86400000).toISOString(),
    };
    createActivityMutation.mutateAsync(body, {
      onError: () => {
        toast({
          title: "Error",
          description:
            "Ha ocurrido un error al crear la actividad. Revisa que el slug sea único.",
          variant: "destructive",
        });
      },
      onSuccess: () => {
        toast({
          title: "Actividad creada",
          description: "La actividad se ha creado correctamente.",
          variant: "success",
        });
      },
    });
  };

  const deleteActivity = (slug: string) => {
    deleteActivityMutation.mutateAsync(slug, {
      onError: () => {
        toast({
          title: "Error",
          description: "Ha ocurrido un error al eliminar la actividad.",
          variant: "destructive",
        });
      },
      onSuccess: () => {
        toast({
          title: "Actividad eliminada",
          description: "La actividad se ha eliminado correctamente.",
          variant: "success",
        });
      },
    });
  };

  const deleteMultipleActivities = (slugs: string[]) => {
    deleteMultipleActivitiesMutation.mutateAsync(slugs, {
      onError: () => {
        toast({
          title: "Error",
          description: "Ha ocurrido un error al eliminar las actividades.",
          variant: "destructive",
        });
      },
      onSuccess: () => {
        toast({
          title: "Actividades eliminadas",
          description: "Las actividades se han eliminado correctamente.",
          variant: "success",
        });
      },
    });
  };

  return {
    activities,
    activitiesMutations,
    getActivities,
    createActivity,
    deleteActivity,
    deleteMultipleActivities,
  };
};
