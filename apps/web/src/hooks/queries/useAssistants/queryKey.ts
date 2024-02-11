export const useQueryKey = (orgId: string) =>
  ["orgs", orgId, "assistants"] as const;
