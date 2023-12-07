import { useToast } from "@/components/ui/use-toast";
import { clientHash } from "@/lib/hashFunctions";
import client from "@/api/client";

export const useAttendances = (orgId: string = "") => {
  const { toast } = useToast();
  const takeAttendance = async (
    activitySlug: string,
    studentCode: string
  ): Promise<void> => {
    const studentId = await Promise.resolve(clientHash(studentCode, orgId));
    const body = {
      attendance: {
        activity_slug: activitySlug,
        student_code: studentId,
      },
    };
    return await client
      .post(`/api/v1/courses/${orgId}/attendances/`, body)
      .then(() => {
        toast({
          title: "Asistencia tomada",
          description: "La asistencia se ha tomado correctamente.",
          variant: "success",
        });
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "Error al tomar asistencia",
          description: "Ha ocurrido un error al tomar la asistencia.",
          variant: "destructive",
        });
      });
  };
  return { takeAttendance };
};
