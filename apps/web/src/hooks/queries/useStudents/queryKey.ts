export const useQueryKey = (orgId: string) =>
  ["orgs", orgId, "students"] as const;
