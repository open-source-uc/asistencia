import type { CreateStudent } from "@/types/interfaces";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryKey } from "./queryKey";
import { useStudentsRequests } from "./apiCalls";
import { useCacheModifiers } from "./cacheModifiers";


export const useStudentsQuery = (orgId: string) => {
  const queryKey = useQueryKey(orgId);
  const { studentsQuery } = useStudentsRequests(orgId);
  const query = useQuery({ queryKey, queryFn: studentsQuery });
  return query;
};

export const useStudentsMutations = (orgId: string) => {
  const queryKey = useQueryKey(orgId);
  const { addStudentsToCache } = useCacheModifiers(queryKey);
  const {
    createStudent: createStudentRequest,
    createMultipleStudents: createMultipleStudentsRequest,
  } = useStudentsRequests(orgId);

  const createStudent = useMutation({
    mutationFn: (student: CreateStudent) =>
      createStudentRequest(student.attendance_codes, student.display_name),
    onSuccess: (student) => addStudentsToCache([student]),
  });

  const createMultipleStudents = useMutation({
    mutationFn: createMultipleStudentsRequest,
    onSuccess: (students) => addStudentsToCache(students),
  });

  return { createStudent, createMultipleStudents };
};
