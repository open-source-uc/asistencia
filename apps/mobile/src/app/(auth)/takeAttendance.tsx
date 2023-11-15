import { View, Text, TextInput, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useState } from "react";
import { takeAttendance } from "@/api/attendance";
import { useLocalSearchParams } from "expo-router";
import { Snackbar } from "react-native-paper";
import QrScan from "@/components/qrScan";
import NfcScan from "@/components/nfcScan";

function TakeAttendance() {
  const { courseName, courseId, activitySlug } = useLocalSearchParams();
  const [studentAttendanceId, setStudentAttendanceId] = useState("");
  const [snackBarMessage, setSnackBarMessage] = useState("");

  const handleManualEntry = async () => {
    try {
      await takeAttendance(
        {
          student_attendance_id: studentAttendanceId,
        },
        courseId as string,
        activitySlug as string
      );
      setSnackBarMessage(
        `Alumno con identificador ${studentAttendanceId} registrado`
      );
      setStudentAttendanceId("");
    } catch (error) {
      setSnackBarMessage("Error al registrar asistencia");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{courseName}</Text>
      <Text style={styles.subtitle}>{activitySlug}</Text>
      <View style={{ width: "100%", height: "50%" }}>
        <QrScan courseId={courseId} activitySlug={activitySlug} />
      </View>
      <NfcScan courseId={courseId} activitySlug={activitySlug} />
      <View style={styles.manualEntry}>
        <TextInput
          style={styles.input}
          placeholder="Ingresar RUT/N° Alumno"
          onChangeText={(text) => setStudentAttendanceId(text)}
          value={studentAttendanceId}
        />
        <Button onPress={handleManualEntry}>Agregar</Button>
      </View>
      <Snackbar
        visible={snackBarMessage !== ""}
        onDismiss={() => setSnackBarMessage("")}
        duration={2000}
      >
        {snackBarMessage}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    alignSelf: "center",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 32,
    alignSelf: "center",
  },
  buttonContainer: {
    marginBottom: 16,
  },
  manualEntry: {
    flexDirection: "row",
    alignItems: "center",
    margin: 16,
  },
  input: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    marginRight: 8,
    padding: 8,
  },

  button: {
    borderRadius: 8,
    margin: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  text: {
    fontSize: 12,
    fontWeight: "bold",
    color: "white",
  },
});

export default TakeAttendance;
