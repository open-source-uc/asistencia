import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import NfcManager, { NfcTech } from "react-native-nfc-manager";
import { calculateChileanRunValidator } from "@/utils/auxFunctions";
import { takeAttendance } from "@/api/attendance";
import { useTheme, Snackbar } from "react-native-paper";

function NfcScan({ courseId, activitySlug }) {
  const [studentAttendanceId, setStudentAttendanceId] = useState("");
  const theme = useTheme();
  const [snackBarMessage, setSnackBarMessage] = useState("");

  const handleTakeAttendance = async () => {
    if (!studentAttendanceId) return;
    try {
      await takeAttendance(
        {
          student_attendance_id: studentAttendanceId,
        },
        courseId,
        activitySlug
      );

      setSnackBarMessage(
        `Alumno con identificador ${studentAttendanceId} registrado`
      );
      setStudentAttendanceId("");
    } catch (error) {
      setSnackBarMessage("Error al registrar asistencia");
    }
  }
  useEffect(() => {
    handleTakeAttendance();
  }, [studentAttendanceId]);

  const readMifare = async () => {
    try {
      await NfcManager.requestTechnology(NfcTech.MifareClassic);
      const isAuthenticated = await authenticateCard();

      if (isAuthenticated) {
        const data = await readCardData();
        if (data) {
          setStudentAttendanceId(data);
        }
      }
    } catch (error) {
      setSnackBarMessage("Error al leer la tarjeta");
    } finally {
      await NfcManager.cancelTechnologyRequest();
    }
  };

  const authenticateCard = async () => {
    const sectorThreeKey = "32AC3B90AC13";
    const keyA = sectorThreeKey
      .match(/.{1,2}/g)
      .map((item) => parseInt(item, 16));
    return await NfcManager.mifareClassicHandlerAndroid.mifareClassicAuthenticateA(
      3,
      keyA
    );
  };

  const readCardData = async () => {
    const blockIndex = 13;
    const blockData =
      await NfcManager.mifareClassicHandlerAndroid.mifareClassicReadBlock(
        blockIndex
      );
    const bytes = blockData.slice(3, 7);
    const intRut = bytes.reduce(
      (acc, byte, index) => acc + (byte << (8 * index)),
      0
    );
    return `${intRut}-${calculateChileanRunValidator(intRut.toString())}`;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.primary }]}
        onPress={readMifare}
      >
        <Text style={styles.buttonText}>Scan a Tag</Text>
      </TouchableOpacity>
      <Snackbar
        visible={snackBarMessage !== ""}
        onDismiss={() => setSnackBarMessage("")}
        action={{
          label: "OK",
          onPress: () => setSnackBarMessage(""),
        }}
      >
        {snackBarMessage}
      </Snackbar>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  rutText: {
    marginTop: 16,
    fontSize: 18,
    color: "#333",
  },
});

export default NfcScan;
