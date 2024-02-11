export const useQueryKey = (orgId: string) => ["orgs", orgId] as const;

export const useUserPermissionsOrgQueryKey = (orgId: string) =>
  ["userPermissionsOrgQuery", orgId] as const;
