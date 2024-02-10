import client from "@/api/client";
import type { CreateStudent } from "./types";

const basePath = "api/v1/courses";

export const useStudentsRequests = (orgId: string) => {
  const studentsQuery = async () => {
    return await client.get(`${basePath}/${orgId}/students/`);
  };

  const createStudent = async (
    studentHashCodes: string[],
    displayName: string | undefined
  ) => {
    let body: CreateStudent = { attendance_codes: studentHashCodes };
    if (displayName !== "") {
      body = { ...body, display_name: displayName };
    }
    await client.post(`${basePath}/${orgId}/students/`, body);
  };

  const createMultipleStudents = async (
    students: CreateStudent[]
  ): Promise<void> => {
    return await client.post(`${basePath}/${orgId}/students/batch_create`, {
      students,
    });
  };

  return {
    studentsQuery,
    createStudent,
    createMultipleStudents,
  };
};
