import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryKey } from "./queryKey";
import { useAssistantsRequests } from "./apiCalls";
import { UserType } from "@/types/enums";
import { useCacheModifiers } from "./cacheModifiers";

export const useAssistantsQuery = (orgId: string) => {
  const queryKey = useQueryKey(orgId);
  const { assistantsQuery } = useAssistantsRequests(orgId);
  const query = useQuery({ queryKey, queryFn: assistantsQuery });
  return query;
};

export const useAssistantsMutations = (orgId: string) => {
  const queryKey = useQueryKey(orgId);
  const { addAssistantsToCache, removeMultipleAssistantsFromCache } =
    useCacheModifiers(queryKey);
  const {
    addAssistant: addAssistantRequest,
    addMultipleAssistants: addMultipleAssistantsRequest,
    removeAssistant: removeAssistantRequest,
    removeMultipleAssistants: removeMultipleAssistantsRequest,
  } = useAssistantsRequests(orgId);

  const addAssistant = useMutation({
    mutationFn: ({
      email,
      role,
    }: {
      email: string;
      role: UserType | undefined;
    }) => addAssistantRequest(email, role),
    onSuccess: (assistant) => addAssistantsToCache([assistant]),
  });

  const addMultipleAssistants = useMutation({
    mutationFn: ({
      emails,
      role,
    }: {
      emails: string[];
      role: UserType | undefined;
    }) => addMultipleAssistantsRequest(emails, role),
    onSuccess: (assistants) => addAssistantsToCache(assistants),
  });

  const removeAssistant = useMutation({
    mutationFn: ({
      email,
      role,
    }: {
      email: string;
      role: UserType | undefined;
    }) => removeAssistantRequest(email, role),
    onSuccess: (_, { email }) => removeMultipleAssistantsFromCache([email]),
  });

  const removeMultipleAssistants = useMutation({
    mutationFn: removeMultipleAssistantsRequest,
    onSuccess: (_, users) =>
      removeMultipleAssistantsFromCache(users.map((user) => user.email)),
  });

  return {
    addAssistant,
    addMultipleAssistants,
    removeAssistant,
    removeMultipleAssistants,
  };
};
