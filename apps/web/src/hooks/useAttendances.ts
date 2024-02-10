import type { Student } from "@/types/interfaces";
import { useToast } from "@/components/ui/use-toast";
import { clientHash } from "@/lib/hashFunctions";
import client from "@/api/client";

export const useAttendances = (orgId: string = "") => {
  const { toast } = useToast();
  const { takeAttendance: takeAttendanceRequest } =
    useAttendancesRequests(orgId);
  const takeAttendance = async (
    activitySlug: string,
    studentCode: string
  ): Promise<void> => {
    try {
      const student = await takeAttendanceRequest(activitySlug, studentCode);
      const description = student.display_name
        ? `La asistencia de ${student.display_name} en la actividad ${activitySlug} se ha tomado correctamente.`
        : `La asistencia se ha tomado correctamente.`;

      toast({
        title: "Asistencia tomada",
        description: description,
        variant: "success",
      });
    } catch (e) {
      toast({
        title: "Error al tomar asistencia",
        description: "Ha ocurrido un error al tomar la asistencia.",
        variant: "destructive",
      });
    }
  };
  return { takeAttendance };
};

const basePath = "api/v1/courses";
export const useAttendancesRequests = (orgId: string) => {
  const takeAttendance = async (
    activity_slug: string,
    student_code: string
  ): Promise<Student> => {
    const studentId = await Promise.resolve(clientHash(student_code, orgId));
    const body = {
      attendance: {
        activity_slug,
        student_code: studentId,
      },
    };
    const res = await client.post(`${basePath}/${orgId}/attendances/`, body);
    return res.data.attendance.student;
  };

  return {
    takeAttendance,
  };
};
