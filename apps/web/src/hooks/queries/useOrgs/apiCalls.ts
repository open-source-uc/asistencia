import client from "@/api/client";
import { UserType } from "@/types/enums";

const basePath = "api/v1/courses";

export const useOrgsRequests = () => {
  const userPermissionsOrgQuery = async (slug: string): Promise<UserType> => {
    const res = await client.get(`${basePath}/${slug}/user_courses/me`);
    return (
      UserType[
        Object.keys(res.data)
          .find((key) => res.data[key].length > 0)
          ?.toUpperCase() as keyof typeof UserType
      ] || UserType.VIEWER
    );
  };

  const orgsQuery = async () => {
    const res = await client.get(`${basePath}/`);
    return res.data.courses;
  };

  const createOrg = async (name: string, slug: string) => {
    const res = await client.post(`${basePath}/`, {
      name,
      slug,
      enabled: true,
    });
    return res.data;
  };

  const deleteOrg = async (orgSlug: string) => {
    return await client.delete(`${basePath}/${orgSlug}`);
  };

  return {
    userPermissionsOrgQuery,
    orgsQuery,
    createOrg,
    deleteOrg,
  };
};
