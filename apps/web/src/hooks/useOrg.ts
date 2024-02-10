import { useUserPermissionsOrgQuery, useOrgQuery } from "./queries/useOrg";
import { UserType } from "@/types/enums";
import type { Org } from "@/types/interfaces";

export const useOrg = (orgId: string = "") => {
  const userPermissionsOrg = useUserPermissionsOrgQuery(orgId);
  const org = useOrgQuery(orgId);

  const getOrg = (): Org | undefined => {
    return org.data;
  };

  const getPermissions = () => {
    return userPermissionsOrg.data || UserType.VIEWER;
  };

  return {
    userPermissionsOrg,
    getPermissions,
    org,
    getOrg,
  };
};
