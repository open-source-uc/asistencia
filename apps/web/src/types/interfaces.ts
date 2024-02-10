import type { UserType } from "@/types/enums";

export interface Message {
  type: "error" | "success";
  content: string;
}

export interface CreateOrg {
  name: string;
  slug: string;
}

export interface Org extends CreateOrg {
  id: string;
  enabled: boolean;
}

export interface OrgData extends Org {
  userType: UserType;
}