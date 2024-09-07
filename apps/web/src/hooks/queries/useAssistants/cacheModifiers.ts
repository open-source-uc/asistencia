import { useQueryClient } from "@tanstack/react-query";
import { useQueryKey } from "./queryKey";
import type { Assistant } from "@/types/interfaces";

export const useCacheModifiers = (queryKey: ReturnType<typeof useQueryKey>) => {
  const queryClient = useQueryClient();

  const addAssistantsToCache = (assistants: Assistant[]) => {
    queryClient.setQueryData<Assistant[]>(queryKey, (data) => {
      if (!data) return [...assistants];
      return [...data, ...assistants];
    });
  };

  const removeMultipleAssistantsFromCache = (emails: string[]) => {
    const emailsSet = new Set(emails);
    queryClient.setQueryData<Assistant[]>(queryKey, (data) => {
      if (!data) return [];
      return data.filter((assistant) => !emailsSet.has(assistant.email));
    });
  };
  return {
    addAssistantsToCache,
    removeMultipleAssistantsFromCache,
  };
};
