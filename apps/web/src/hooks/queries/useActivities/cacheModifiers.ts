import { useQueryClient } from "@tanstack/react-query"
import { useQueryKey } from "./queryKey"
import type { Activity } from "@/types/interfaces";

export const useCacheModifiers = (queryKey: ReturnType<typeof useQueryKey>) => {
  const queryClient = useQueryClient()

  const addActivitiesToCache = (activities: Activity[]) => {
    queryClient.setQueryData<Activity[]>(queryKey, (data) => {
      if (!data) return [...activities]
      return [...data, ...activities]
    })
  }

  const removeMultipleActivitiesFromCache = (slugs: string[]) => {
    const slugsSet = new Set(slugs)
    queryClient.setQueryData<Activity[]>(queryKey, (data) => {
      if (!data) return []
      return data.filter((activity) => !slugsSet.has(activity.slug))
    })
  }
  return {
    addActivitiesToCache,
    removeMultipleActivitiesFromCache,
  }
}