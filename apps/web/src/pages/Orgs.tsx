import { useOrgs } from "@/hooks/useOrgs";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/loading-spinner";

export default function Orgs(): JSX.Element {
  const { orgs, isLoading } = useOrgs();
  const navigate = useNavigate();


  return (
    <div className="space-y-6 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-center">Organizaciones</h2>
      <p>Tienes permiso para gestionar las siguientes organizaciones</p>
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <div className="space-y-6 flex flex-col w-full max-x-2xl">
          {orgs.map((course, i) => (
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
      )}
    </div>
  );
}
