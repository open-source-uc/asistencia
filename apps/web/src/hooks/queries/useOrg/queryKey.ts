export const useQueryKey = (slug: string) => ["orgs", slug] as const;

export const useUserPermissionsOrgQueryKey = (slug: string) =>
  ["userPermissionsOrgQuery", slug] as const;
