/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import axios from "axios";
import { useUserSession } from "./useUserSession";

interface Assistant {
  id: string;
  user_email: string;
  role: string;
  active: boolean;
}

export const useAssistants = (orgId: string = "") => {
  const { userSession } = useUserSession();
  const [assistants, setAssistants] = useState<Assistant[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const getAssistantsByOrg = async () => {
    return await axios
      .get(`${import.meta.env.VITE_API_URL}/user_courses/${orgId}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${userSession.access_token}`,
        },
      })
      .then((res) => {
        return res.data;
      })
      .catch(() => {
        return [];
      });
  };

  const addAssistantToOrg = async (
    userEmail: string,
    role: "admin" | "assistant" | "default" = "default"
  ): Promise<Assistant | undefined> => {
    return await axios
      .post(
        `${import.meta.env.VITE_API_URL}/user_courses/?course_id=${orgId}`,
        {
          course_id: orgId,
          user_email: userEmail,
          role: role,
          active: true,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${userSession.access_token}`,
          },
        }
      )
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
