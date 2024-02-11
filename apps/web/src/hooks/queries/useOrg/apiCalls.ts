import client from "@/api/client";
import { UserType } from "@/types/enums";
import type { Org } from "@/types/interfaces";

const basePath = "api/v1/courses";

export const useOrgRequests = (orgId: string) => {
  const userPermissionsOrgQuery = async (): Promise<UserType> => {
    const res = await client.get(`${basePath}/${orgId}/user_courses/me`);
    return (
      UserType[
        Object.keys(res.data)
          .find((key) => res.data[key].length > 0)
          ?.toUpperCase() as keyof typeof UserType
      ] || UserType.VIEWER
    );
  };

  const orgQuery = async (): Promise<Org> => {
    const res = await client.get(`${basePath}/${orgId}`);
    return res.data.course;
  };

  return {
    userPermissionsOrgQuery,
    orgQuery,
  };
};
