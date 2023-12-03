import type { Org } from "@/hooks/useOrgs";
import type { UserType } from "@/types/enums";

export interface Message {
  type: "error" | "success";
  content: string;
}

export interface OrgData extends Org {
  userType: UserType;
}
