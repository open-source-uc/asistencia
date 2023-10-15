import { ArrowRight } from "lucide-react";
import LoginForm from "@/components/login-form";
import RegisterForm from "@/components/register-form";

const features = [
  "Crear organizaciones, que representan tus cursos",
  "Agregar ayudantes o profesores a tus organizaciones, para poder gestionarlas",
  "Agregar estudiantes a tus organizaciones, para poder tomarles asistencia ",
  "Crear Actividades, los que forman parte de tus cursos, y que se pueden tomar asistencia en ellos",
  "Tomar asistencia en tus actividades de una forma ágil y rápida, para saber quienes asistieron y quienes no",
];

export default function LandingPage(): JSX.Element {
  return (
    <div className="flex flex-col items-center w-full bg-secondary text-secondary-foreground p-16 h-full">
      <h2 className="text-4xl font-bold text-center">
        Bienvenido a AttendanceUC
      </h2>

      <p className="mt-6">
        Tu aplicación para gestionar una toma de asistencia eficiente en tu sala
        de clases.
      </p>
      <div className="flex flex-row items-start justify-center w-full space-x-6 my-12">
        <RegisterForm />
        <LoginForm />
      </div>
      <div className="flex flex-col justify-center items-center mb-4 bg-gradient-to-b from-miku-1 to-miku-2 text-miku-foreground rounded-xl p-4 px-6 shadow-inner-md">
        <h3 className="text-xl font-bold text-center my-4">
          Dependiendo de tu rol en AttendanceUC, puedes
        </h3>
        {features.map((feature, i) => (
          <div className="flex w-full items-center my-4" key={i}>
            <ArrowRight className="w-6 h-6 mr-2" />
            <p>{feature}</p>
          </div>
        ))}
      </div>
      <div className="border-2 border-secondary rounded-xl p-4 px-6 my-4">
        Para tomar asistencia en tus actividades, puedes usar...
      </div>
    </div>
  );
}
