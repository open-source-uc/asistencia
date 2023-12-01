import { sha512 } from "js-sha512";

import client from "./client";

function hashStudentCode(code: string, courseId: string): string {
  return sha512(`${sha512(`${code}${courseId}`)}${courseId}`);
}

const takeAttendance = async (
  student_code: string,
  courseSlug: string,
  activitySlug: string,
) => {
  const data = {
    attendance: {
      student_code: hashStudentCode(student_code, courseSlug),
      activity_slug: activitySlug,
    },
  };
  await client.post(`/courses/${courseSlug}/attendances`, data);
};

export { takeAttendance };
