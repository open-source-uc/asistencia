import { useState } from "react";
import { clientHash } from "@/lib/hashFunctions";
import client from "@/api/client";

interface Message {
  message: string;
  type: "success" | "error";
}

export const useAttendances = (orgId: string = "") => {
  const [message, setMessage] = useState<Message>({
    message: "",
    type: "success",
  });
  const takeAttendance = async (
    activitySlug: string,
    studentCode: string
  ): Promise<void> => {
    try {
      const studentId = await Promise.resolve(clientHash(studentCode, orgId));
      const body = {
        student_attendance_id: studentId,
      };
      await client.post(
        `/courses/${orgId}/activities/${activitySlug}/attendances/`,
        body
      );
      setMessage({
        message: "Asistencia registrada correctamente",
        type: "success",
      });
    } catch (err) {
      setMessage({
        message: "Error al registrar la asistencia",
        type: "error",
      });
    }
  };
  return { takeAttendance, message };
};
