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

export interface Student {
  id: string;
  attendance_codes: string[];
  course_id: string;
  created_at: string;
  display_name: string;
  updated_at: string;
}

export interface CreateStudent {
  display_name?: string;
  attendance_codes: string[];
}

export interface CreateAssistant {
  email: string;
  role: UserType | undefined;
}

export interface Assistant extends CreateAssistant {
  id: string;
}
