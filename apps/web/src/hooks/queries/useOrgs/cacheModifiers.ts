import { useQueryClient } from "@tanstack/react-query";
import { useQueryKey } from "./queryKey";
import type { Org } from "@/types/interfaces";

export const useCacheModifiers = (queryKey: ReturnType<typeof useQueryKey>) => {
  const queryClient = useQueryClient();

  const addOrgToCache = (org: Org) => {
    queryClient.setQueryData<Org[]>(queryKey, (data) => {
      if (!data) return [org];
      return [...data, org];
    });
  };

  const removeOrgFromCache = (orgId: string) => {
    queryClient.setQueryData<Org[]>(queryKey, (data) => {
      if (!data) return [];
      return data.filter((org) => org.id !== orgId);
    });
  };

  return {
    addOrgToCache,
    removeOrgFromCache,
  };
};
