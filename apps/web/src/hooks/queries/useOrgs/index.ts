import type { CreateOrg } from "@/types/interfaces";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryKey } from "./queryKey";
import { useOrgsRequests } from "./apiCalls";
import { useCacheModifiers } from "./cacheModifiers";

export const useOrgsQuery = () => {
  const queryKey = useQueryKey();
  const { orgsQuery } = useOrgsRequests();
  const query = useQuery({ queryKey, queryFn: orgsQuery });
  return query;
};

export const useOrgsMutations = () => {
  const queryKey = useQueryKey();
  const { addOrgToCache, removeOrgFromCache } = useCacheModifiers(queryKey);
  const { createOrg: createOrgRequest, deleteOrg: deleteOrgRequest } =
    useOrgsRequests();

  const createOrg = useMutation({
    mutationFn: (org: CreateOrg) => createOrgRequest(org.name, org.slug),
    onSuccess: (org) => addOrgToCache(org),
  });

  const deleteOrg = useMutation({
    mutationFn: deleteOrgRequest,
    onSuccess: (_, orgId) => removeOrgFromCache(orgId),
  });

  return { createOrg, deleteOrg };
};
