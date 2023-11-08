import { useUserSession } from "./useUserSession";
import { useState } from "react";
import { clientHash } from "@/lib/hashFunctions";
import axios from "axios";

interface Message {
  message: string;
  type: "success" | "error";
}

export const useAttendances = (orgId: string) => {
  const { userSession } = useUserSession();
  const [message, setMessage] = useState<Message>({
    message: "",
    type: "success",
  });
  const takeAttendance = async (
    activitySlug: string,
    studentCode: string
  ): Promise<void> => {
    try {
      const body = {
        student_attendance_id: clientHash(studentCode, orgId),
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
            Authorization: `Bearer ${userSession.access_token}`,
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
