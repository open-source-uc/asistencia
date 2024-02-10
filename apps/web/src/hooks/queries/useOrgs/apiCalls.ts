import client from "@/api/client";
import { UserType } from "@/types/enums";

const basePath = "api/v1/courses";

export const useOrgsRequests = () => {
  const userPermissionsOrgQuery = async (slug: string): Promise<UserType> => {
    const res = await client.get(`/api/v1/courses/${slug}/user_courses/me`);
    return (
      UserType[
        Object.keys(res.data)
          .find((key) => res.data[key].length > 0)
          ?.toUpperCase() as keyof typeof UserType
      ] || UserType.VIEWER
    );
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
    userPermissionsOrgQuery,
    orgsQuery,
    createOrg,
    deleteOrg,
  };
};
