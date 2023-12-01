/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import client from "@/api/client";

interface Assistant {
  id: string;
  email: string;
  role: string;
  // active: boolean;
}

export const useAssistants = (orgId: string = "") => {
  const [assistants, setAssistants] = useState<Assistant[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const getAssistantsByOrg = async () => {
    return await client
      .get(`/api/v1/courses/${orgId}/user_courses`)
      .then((res) => {
        // merge res.data.admin, res.data.manager, res.data.viewer
        // {email: 'attendance@uc.cl', id: 5}
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
    role: "admin" | "manager" | "viewer" = "viewer"
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
    userEmails: string[]
  ): Promise<void> => {
    return await Promise.all(
      userEmails.map((userEmail) => addAssistantToOrg(userEmail))
    ).then(async () => setAssistants(await getAssistantsByOrg()));
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
  };
};
