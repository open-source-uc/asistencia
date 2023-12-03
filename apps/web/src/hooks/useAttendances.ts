import { useState } from "react";
import { clientHash } from "@/lib/hashFunctions";
import client from "@/api/client";
import { Message } from "@/constants/interfaces";

export const useAttendances = (orgId: string = "") => {
  const [message, setMessage] = useState<Message>({
    content: "",
    type: "success",
  });
  const takeAttendance = async (
    activitySlug: string,
    studentCode: string
  ): Promise<void> => {
    try {
      const studentId = await Promise.resolve(clientHash(studentCode, orgId));
      const body = {
        attendance: {
          activity_slug: activitySlug,
          student_code: studentId,
        },
      };
      await client.post(`/api/v1/courses/${orgId}/attendances/`, body);
      setMessage({
        content: "Asistencia registrada correctamente",
        type: "success",
      });
    } catch (err) {
      setMessage({
        content: "Error al registrar la asistencia",
        type: "error",
      });
    }
  };
  return { takeAttendance, message };
};
