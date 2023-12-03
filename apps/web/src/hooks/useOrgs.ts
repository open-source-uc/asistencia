/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import client from "@/api/client";
import { Message } from "@/constants/interfaces";

export interface OrgField {
  name: string;
  slug: string;
}

export interface Org extends OrgField {
  id: string;
  enabled: boolean;
}

export const useOrgs = (): {
  orgs: Org[];
  isLoading: boolean;
  deleteOrg: (orgSlug: string) => Promise<void>;
} => {
  const { getOrgs, deleteOrg: deleteOrgHandler } = useHandlerOrgs();
  const [orgs, setOrgs] = useState<Org[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await getOrgs();
      setOrgs(data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const deleteOrg = async (orgSlug: string) => {
    await deleteOrgHandler(orgSlug).then(() =>
      setOrgs(orgs.filter((org) => org.slug !== orgSlug))
    );
  };
  return { orgs, isLoading, deleteOrg };
};

export const useHandlerOrgs = (): {
  getOrgs: () => Promise<any>;
  createOrg: (values: OrgField) => Promise<any>;
  deleteOrg: (orgSlug: string) => Promise<any>;
  message: Message;
} => {
  const [message, setMessage] = useState<Message>({
    type: "success",
    content: "",
  });
  const getOrgs = async () => {
    try {
      const res = await client.get(`/api/v1/courses/`);
      return res.data.courses;
    } catch (error) {
      console.log(error);
    }
    return [];
  };

  const createOrg = async (values: OrgField) => {
    return await client
      .post(`/api/v1/courses/`, {
        ...values,
        enabled: true,
      })
      .then(() => {
        setMessage({
          type: "success",
          content: "Organización creada correctamente",
        });
      })
      .catch((err) => {
        console.log(err);
        setMessage({
          type: "error",
          content: "Error al crear la organización",
        });
      });
  };

  const deleteOrg = async (orgSlug: string) => {
    return await client.delete(`/api/v1/courses/${orgSlug}`).catch((err) => {
      console.log(err);
    });
  };

  return { createOrg, getOrgs, deleteOrg, message };
};
