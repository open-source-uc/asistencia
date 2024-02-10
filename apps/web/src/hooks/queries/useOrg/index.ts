import { useQuery } from "@tanstack/react-query";
import { useQueryKey, useUserPermissionsOrgQueryKey } from "./queryKey";
import { useOrgRequests } from "./apiCalls";

export const useOrgQuery = (slug: string) => {
  const queryKey = useQueryKey(slug);
  const { orgQuery } = useOrgRequests(slug);
  const query = useQuery({ queryKey, queryFn: orgQuery });
  return { ...query };
};

export const useUserPermissionsOrgQuery = (slug: string) => {
  const queryKey = useUserPermissionsOrgQueryKey(slug);
  const { userPermissionsOrgQuery } = useOrgRequests(slug);
  const query = useQuery({
    queryKey,
    queryFn: () => userPermissionsOrgQuery(),
  });
  return { ...query };
};
