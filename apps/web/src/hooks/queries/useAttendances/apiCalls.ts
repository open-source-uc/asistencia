import client from "@/api/client";

const basePath = "api/v1/courses";

interface Attendance {
  student: {
    display_name: string;
  };
}

export const useAttendancesRequests = (orgId: string) => {
  const takeAttendance = async (
    activity_slug: string,
    student_code: string
  ): Promise<Attendance> => {
    return await client.post(`${basePath}/${orgId}/attendances/`, {
      activity_slug,
      student_code,
    });
  };

  return {
    takeAttendance,
  };
};
