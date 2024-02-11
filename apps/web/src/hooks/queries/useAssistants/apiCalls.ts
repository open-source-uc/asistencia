import client from "@/api/client";
import { UserType } from "@/types/enums";
import type { Assistant, CreateAssistant } from "@/types/interfaces";

const mapAssistantsWithRole = (assistants: Assistant[], role: UserType) =>
  assistants.map((assistant) => ({ ...assistant, role }));

const mergeAssistants = (res: {
  data: { admin: Assistant[]; manager: Assistant[]; viewer: Assistant[] };
}) => {
  return [
    ...mapAssistantsWithRole(res.data.admin, UserType.ADMIN),
    ...mapAssistantsWithRole(res.data.manager, UserType.MANAGER),
    ...mapAssistantsWithRole(res.data.viewer, UserType.VIEWER),
  ];
};

const basePath = "api/v1/courses";

export const useAssistantsRequests = (orgId: string) => {
  const assistantsQuery = async (): Promise<Assistant[]> => {
    const res = await client.get(`${basePath}/${orgId}/user_courses`);
    const assistants = mergeAssistants(res);
    return assistants;
  };

  const addAssistant = async (
    email: string,
    role: UserType = UserType.VIEWER
  ): Promise<Assistant | undefined> => {
    const res = await client.post(`${basePath}/${orgId}/user_courses`, {
      email,
      role,
    });
    return res.data;
  };

  const addMultipleAssistants = async (
    emails: string[],
    role: UserType | undefined
  ): Promise<Assistant[] | undefined> => {
    if (!role) {
      throw new Error("Role is required");
    }
    const res = await client.post(
      `/api/v1/courses/${orgId}/user_courses/batch_create`,
      {
        emails,
        role,
      }
    );
    const assistants = mergeAssistants(res);
    return assistants;
  };

  const removeAssistant = async (
    email: string,
    role: UserType = UserType.VIEWER
  ): Promise<Assistant | undefined> => {
    return await client.delete(`/api/v1/courses/${orgId}/user_courses`, {
      data: { email, role },
    });
  };

  const removeMultipleAssistants = async (
    users: CreateAssistant[]
  ): Promise<void> => {
    users.map(async (user) => {
      removeAssistant(user.email, user.role);
    });
  };

  return {
    assistantsQuery,
    addAssistant,
    addMultipleAssistants,
    removeAssistant,
    removeMultipleAssistants,
  };
};
