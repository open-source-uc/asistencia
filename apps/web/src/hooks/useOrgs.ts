/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import client from "@/api/client";

export interface OrgField {
  name: string;
}

export interface Org extends OrgField {
  id: string;
  enabled: boolean;
}

export const useOrgs = (): {
  orgs: Org[];
  isLoading: boolean;
} => {
  const { getOrgs } = handlerOrgs();
  const [orgs, setOrgs] = useState([]);
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
  return { orgs, isLoading };
};

export const handlerOrgs = (): {
  getOrgs: () => Promise<any>;
  createOrg: (values: OrgField) => Promise<any>;
} => {
  const getOrgs = async () => {
    try {
      const res = await client.get(`/courses/`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
    return [];
  };

  const createOrg = async (values: OrgField) => {
    return await client
      .post(`/courses/`, {
        ...values,
        archived: false,
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return { createOrg, getOrgs };
};
