import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryKey } from "./queryKey";
import { useAssistantsRequests } from "./apiCalls";
import { useQueryClient } from "@tanstack/react-query";
import { UserType } from "@/types/enums";

export const useAssistantsQuery = (orgId: string) => {
  const queryKey = useQueryKey(orgId);
  const { assistantsQuery } = useAssistantsRequests(orgId);
  const query = useQuery({ queryKey, queryFn: assistantsQuery });
  return { ...query };
};

export const useAssistantsMutations = (orgId: string) => {
  const queryClient = useQueryClient();
  const queryKey = useQueryKey(orgId);
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
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  const addMultipleAssistants = useMutation({
    mutationFn: ({
      emails,
      role,
    }: {
      emails: string[];
      role: UserType | undefined;
    }) => addMultipleAssistantsRequest(emails, role),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  const removeAssistant = useMutation({
    mutationFn: ({
      email,
      role,
    }: {
      email: string;
      role: UserType | undefined;
    }) => removeAssistantRequest(email, role),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  const removeMultipleAssistants = useMutation({
    mutationFn: removeMultipleAssistantsRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  return {
    addAssistant,
    addMultipleAssistants,
    removeAssistant,
    removeMultipleAssistants,
  };
};
