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