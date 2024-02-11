import client from "@/api/client";
import type { CreateStudent, Student } from "@/types/interfaces";
import { clientHash } from "@/lib/hashFunctions";

const basePath = "api/v1/courses";

export const useStudentsRequests = (orgId: string) => {
  const studentsQuery = async (): Promise<Student[]> => {
    const res = await client.get(`${basePath}/${orgId}/students/`);
    return res.data.students;
  };

  const createStudent = async (
    studentCodes: string[],
    displayName: string | undefined
  ): Promise<Student> => {
    const studentIds = await Promise.all(
      studentCodes.map(
        (studentCode: string): Promise<string> => clientHash(studentCode, orgId)
      )
    );
    let body: CreateStudent = { attendance_codes: studentIds };
    if (displayName !== "") {
      body = { ...body, display_name: displayName };
    }
    const res = await client.post(`${basePath}/${orgId}/students/`, body);
    return res.data.student;
  };

  const createMultipleStudents = async (
    students: CreateStudent[]
  ): Promise<Student[]> => {
    const studentsWithHash = await Promise.all(
      students.map(
        async (student: CreateStudent): Promise<CreateStudent> => ({
          ...student,
          attendance_codes: await Promise.all(
            student.attendance_codes.map(
              (attendanceCode: string): Promise<string> =>
                clientHash(attendanceCode, orgId)
            )
          ),
        })
      )
    );
    const res = await client.post(
      `${basePath}/${orgId}/students/batch_create`,
      {
        students: studentsWithHash,
      }
    );
    return res.data.students;
  };

  return {
    studentsQuery,
    createStudent,
    createMultipleStudents,
  };
};
