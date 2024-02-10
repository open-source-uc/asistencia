import client from "@/api/client";

const basePath = "api/v1/courses";

export const useOrgsRequests = () => {
  const myPermissionsOrgQuery = async (slug: string) => {
    return await client.get(`/api/v1/courses/${slug}/user_courses/me`);
  };

  const orgsQuery = async () => {
    return await client.get(`${basePath}/`);
  };

  const createOrg = async (name: string, slug: string) => {
    return await client.post(`/api/v1/courses/`, {
      name,
      slug,
      enabled: true,
    });
  };

  const deleteOrg = async (orgSlug: string) => {
    return await client.delete(`/api/v1/courses/${orgSlug}`);
  };

  return {
    myPermissionsOrgQuery,
    orgsQuery,
    createOrg,
    deleteOrg,
  };
};
