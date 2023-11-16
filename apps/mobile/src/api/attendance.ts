import client from "./client";

const takeAttendance = async (
  data: Object,
  courseId: string,
  activitySlug: string
) => {
  await client.post(
    `/courses/${courseId}/activities/${activitySlug}/attendances/`,
    data
  );
};

export { takeAttendance };
