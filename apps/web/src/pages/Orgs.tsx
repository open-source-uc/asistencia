import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface ICourse {
  id: string;
  name: string;
  code: string;
  year: number;
  semester: string;
  section: string;
}

export default function Orgs(): JSX.Element {
  const [courses, setCourses] = useState<ICourse[]>([]); // TODO: replace with real data
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/courses/`);
      const data = await res.json();
      setCourses(data);
    };
    fetchCourses();
  }, []);

  return (
    <div className="space-y-6 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-center">Organizaciones</h2>
      <p>Tienes permiso para gestionar las siguientes organizaciones</p>
      <div className="space-y-6 flex flex-col w-full max-x-2xl">
        {courses.map((course, i) => (
          <Button
            key={i}
            className="justify-center w-full"
            onClick={() => {
              navigate(`/orgs/${course.id}`);
            }}
          >
            {course.name} {course.code}-{course.section}-{course.year}
          </Button>
        ))}
      </div>
    </div>
  );
}
