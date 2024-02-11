import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryKey } from "./queryKey";
import { useActivitiesRequests } from "./apiCalls";
import { useQueryClient } from "@tanstack/react-query";

export const useActivitiesQuery = (orgId: string) => {
  const queryKey = useQueryKey(orgId);
  const { activitiesQuery } = useActivitiesRequests(orgId);
  const query = useQuery({ queryKey, queryFn: activitiesQuery });
  return { ...query };
};

export const useActivitiesMutations = (orgId: string) => {
  const queryClient = useQueryClient();
  const queryKey = useQueryKey(orgId);
  const {
    createActivity: createActivityRequest,
    deleteActivity: deleteActivityRequest,
    deleteMultipleActivities: deleteMultipleActivitiesRequest,
  } = useActivitiesRequests(orgId);

  const createActivity = useMutation({
    mutationFn: ({
      name,
      slug,
      description,
      date,
    }: {
      name: string;
      slug: string;
      description: string;
      date: string;
    }) => createActivityRequest(name, slug, description, date),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  const deleteActivity = useMutation({
    mutationFn: deleteActivityRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  const deleteMultipleActivities = useMutation({
    mutationFn: deleteMultipleActivitiesRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  return {
    createActivity,
    deleteActivity,
    deleteMultipleActivities,
  };
};
