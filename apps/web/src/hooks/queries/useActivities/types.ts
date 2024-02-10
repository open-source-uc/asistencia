export interface CreateActivity {
  name: string;
  slug: string;
  date: Date;
  description: string;
}

export interface Activity extends CreateActivity {
  id: string;
  course_id: string;
}
