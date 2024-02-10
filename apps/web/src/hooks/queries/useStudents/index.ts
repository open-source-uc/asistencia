import type { CreateStudent, Student } from "./types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryKey } from "./queryKey";
import { useStudentsRequests } from "./apiCalls";
import { useQueryClient } from "@tanstack/react-query";

export { CreateStudent, Student };

export const useStudentsQuery = (orgId: string) => {
  const queryKey = useQueryKey(orgId);
  const { studentsQuery } = useStudentsRequests(orgId);
  return useQuery({ queryKey, queryFn: studentsQuery });
};

export const useStudentsMutations = (orgId: string) => {
  const queryClient = useQueryClient();
  const queryKey = useQueryKey(orgId);
  const {
    createStudent: createStudentRequest,
    createMultipleStudents: createMultipleStudentsRequest,
  } = useStudentsRequests(orgId);

  const createStudent = useMutation({
    mutationFn: (student: CreateStudent) =>
      createStudentRequest(student.attendance_codes, student.display_name),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  const createMultipleStudents = useMutation({
    mutationFn: createMultipleStudentsRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  return { createStudent, createMultipleStudents };
};
