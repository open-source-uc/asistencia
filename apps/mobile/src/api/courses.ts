import client from "./client";

const getCourses = async () => {
  const response = client.get("/courses/");
  return response;
};
export { getCourses };
