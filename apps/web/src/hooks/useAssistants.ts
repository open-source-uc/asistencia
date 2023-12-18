/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import client from "@/api/client";
import { UserType } from "@/types/enums";

interface AssistantField {
  email: string;
  role: UserType | undefined;
}

interface Assistant extends AssistantField {
  id: string;
}

export const useAssistants = (orgId: string = "") => {
  const [assistants, setAssistants] = useState<Assistant[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const getAssistantsByOrg = async () => {
    return await client
      .get(`/api/v1/courses/${orgId}/user_courses`)
      .then((res) => {
        const assistants = [
          ...res.data.admin.map((assistant: Assistant) => ({
            ...assistant,
            role: "admin",
          })),
          ...res.data.manager.map((assistant: Assistant) => ({
            ...assistant,
            role: "manager",
          })),
          ...res.data.viewer.map((assistant: Assistant) => ({
            ...assistant,
            role: "viewer",
          })),
        ];
        return assistants;
      })
      .catch(() => {
        return [];
      });
  };

  const addAssistantToOrg = async (
    userEmail: string,
    role: UserType = UserType.VIEWER
  ): Promise<Assistant | undefined> => {
    return await client
      .post(`/api/v1/courses/${orgId}/user_courses`, {
        email: userEmail,
        role: role,
      })
      .then((res) => {
        return res.data;
      });
  };

  const addMultipleAssistantsToOrg = async (
    userEmails: string[],
    role: UserType | undefined
  ): Promise<void> => {
    if (!role) {
      return Promise.reject();
    }
    return await client
      .post(`/api/v1/courses/${orgId}/user_courses/batch_create`, {
        emails: userEmails,
        role: role,
      })
      .then(() => {
        const usersToAdd = userEmails.filter(
          (email) =>
            !assistants.find(
              (assistant) =>
                assistant.email === email && assistant.role === role
            )
        );
        const usersToAddWithId = usersToAdd.map((email) => ({
          email,
          role,
          id: "",
        }));
        setAssistants((prevAssistants) => [
          ...prevAssistants,
          ...usersToAddWithId,
        ]);
      });
  };

  const removeAssistantFromOrg = async (
    userEmail: string,
    role: UserType = UserType.VIEWER
  ): Promise<Assistant | undefined> => {
    return await client
      .delete(`/api/v1/courses/${orgId}/user_courses`, {
        data: { email: userEmail, role: role },
      })
      .then((res) => {
        setAssistants((prevAssistants) =>
          prevAssistants.filter(
            (assistant) =>
              !(assistant.email === userEmail && assistant.role === role)
          )
        );
        return res.data;
      });
  };

  const removeMultipleAssistantsFromOrg = async (
    users: AssistantField[]
  ): Promise<void> => {
    users.map(async (user) => {
      removeAssistantFromOrg(user.email, user.role);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setAssistants(await getAssistantsByOrg());
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return {
    assistants,
    isLoading,
    addAssistantToOrg,
    addMultipleAssistantsToOrg,
    removeAssistantFromOrg,
    removeMultipleAssistantsFromOrg,
  };
};
