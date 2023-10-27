import { useState } from "react";
import axios from "axios";

interface Message {
  message: string;
  type: "success" | "error";
}

export const useAttendances = (orgId: string | undefined) => {
  const [message, setMessage] = useState<Message>({
    message: "",
    type: "success",
  });
  const takeAttendance = async (
    activitySlug: string,
    studentName: string
  ): Promise<void> => {
    if (!orgId) return;
    try {
      const body = {
        student_attendance_id: studentName,
      };
      await axios.post(
        `${
          import.meta.env.VITE_API_URL
        }/courses/${orgId}/activities/${activitySlug}/attendances/`,
        body,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
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
