import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryKey } from "./queryKey";
import { useActivitiesRequests } from "./apiCalls";
import { useDataTransforms } from "./dataTransforms";
import { useCacheModifiers } from "./cacheModifiers";

export const useActivitiesQuery = (orgId: string) => {
  const queryKey = useQueryKey(orgId);
  const { mapActivities } = useDataTransforms();
  const { activitiesQuery } = useActivitiesRequests(orgId);
  const query = useQuery({
    queryKey,
    queryFn: () => activitiesQuery().then(mapActivities),
  });
  return query;
};

export const useActivitiesMutations = (orgId: string) => {
  const queryKey = useQueryKey(orgId);
  const { addActivitiesToCache, removeMultipleActivitiesFromCache } =
    useCacheModifiers(queryKey);
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
    onSuccess: (activity) => addActivitiesToCache([activity]),
  });

  const deleteActivity = useMutation({
    mutationFn: deleteActivityRequest,
    onSuccess: (_, slug) =>
      removeMultipleActivitiesFromCache([slug]),
  });

  const deleteMultipleActivities = useMutation({
    mutationFn: deleteMultipleActivitiesRequest,
    onSuccess: (_, slugs) =>
      removeMultipleActivitiesFromCache(slugs),
  });

  return {
    createActivity,
    deleteActivity,
    deleteMultipleActivities,
  };
};
