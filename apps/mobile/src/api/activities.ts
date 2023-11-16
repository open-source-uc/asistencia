import client from "./client";

const getActivities = (courseId: string) => {
  const response = client.get(`/courses/${courseId}/activities/`);

  return response;
};
export { getActivities };
