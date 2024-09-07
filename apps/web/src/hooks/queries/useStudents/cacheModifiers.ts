import { useQueryClient } from "@tanstack/react-query";
import { useQueryKey } from "./queryKey";
import type { Student } from "@/types/interfaces";

export const useCacheModifiers = (queryKey: ReturnType<typeof useQueryKey>) => {
  const queryClient = useQueryClient();

  const addStudentsToCache = (students: Student[]) => {
    queryClient.setQueryData<Student[]>(queryKey, (data) => {
      if (!data) return [...students];
      return [...data, ...students];
    });
  };

  return {
    addStudentsToCache,
  };
};
