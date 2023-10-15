import { useState, useEffect } from "react";

export const useCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/courses/`);
      const data = await res.json();
      console.log(data);
      setCourses(data);
    };
    fetchData();
  }, []);

  return { courses };
};
