export const useQueryKey = (orgId: string) =>
  ["orgs", orgId, 'attendances'] as const;
