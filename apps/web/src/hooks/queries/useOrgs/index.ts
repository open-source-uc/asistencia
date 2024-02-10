import type { CreateOrg } from "@/types/interfaces";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryKey } from "./queryKey";
import { useOrgsRequests } from "./apiCalls";
import { useQueryClient } from "@tanstack/react-query";

export const useOrgsQuery = () => {
  const queryKey = useQueryKey();
  const { orgsQuery } = useOrgsRequests();
  const query = useQuery({ queryKey, queryFn: orgsQuery });
  return { ...query };
};

export const useOrgsMutations = () => {
  const queryClient = useQueryClient();
  const queryKey = useQueryKey();
  const { createOrg: createOrgRequest, deleteOrg: deleteOrgRequest } =
    useOrgsRequests();

  const createOrg = useMutation({
    mutationFn: (org: CreateOrg) => createOrgRequest(org.name, org.slug),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  const deleteOrg = useMutation({
    mutationFn: deleteOrgRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  return { createOrg, deleteOrg };
};
