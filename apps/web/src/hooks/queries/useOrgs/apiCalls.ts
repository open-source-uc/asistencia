import client from "@/api/client";
import { UserType } from "@/types/enums";

const basePath = "api/v1/courses";

export const useOrgsRequests = () => {
  const userPermissionsOrgQuery = async (orgId: string): Promise<UserType> => {
    const res = await client.get(`${basePath}/${orgId}/user_courses/me`);
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

  const createOrg = async (name: string, orgId: string) => {
    const res = await client.post(`${basePath}/`, {
      name,
      slug: orgId,
      enabled: true,
    });
    return res.data;
  };

  const deleteOrg = async (orgId: string) => {
    return await client.delete(`${basePath}/${orgId}`);
  };

  return {
    userPermissionsOrgQuery,
    orgsQuery,
    createOrg,
    deleteOrg,
  };
};
