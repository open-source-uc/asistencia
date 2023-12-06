import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home(): JSX.Element {
  const navigate = useNavigate();
  useEffect(() => {
    // to clean the query params
    navigate("/");
  }, [navigate]);

  return (
    <div className="space-y-6 flex flex-col items-center px-4">
      <h2 className="text-2xl font-bold text-center">
        Bienvenido a AttendanceUC
      </h2>
      <hr className="w-3/4 border-input border-1" />
      <p>
        Tu aplicación para gestionar una toma de asistencia eficiente en tu sala
        de clases.
      </p>
    </div>
  );
}
