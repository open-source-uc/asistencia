export const useQueryKey = (orgId: string) =>
  ["orgs", orgId, 'activities'] as const;
