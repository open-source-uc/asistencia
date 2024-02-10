import { useQuery } from "@tanstack/react-query";
import { useQueryKey, useUserPermissionsOrgQueryKey } from "./queryKey";
import { useOrgRequests } from "./apiCalls";

export const useOrgQuery = (orgId: string) => {
  const queryKey = useQueryKey(orgId);
  const { orgQuery } = useOrgRequests(orgId);
  const query = useQuery({ queryKey, queryFn: orgQuery });
  return { ...query };
};

export const useUserPermissionsOrgQuery = (orgId: string) => {
  const queryKey = useUserPermissionsOrgQueryKey(orgId);
  const { userPermissionsOrgQuery } = useOrgRequests(orgId);
  const query = useQuery({
    queryKey,
    queryFn: () => userPermissionsOrgQuery(),
  });
  return { ...query };
};
