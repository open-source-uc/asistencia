import { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Snackbar, ActivityIndicator } from "react-native-paper";
import { calculateChileanRunValidator } from "@/utils/auxFunctions";
import { takeAttendance } from "@/api/attendance";

function QrScan({ courseId, activitySlug }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState("");
  const [snackBarMessage, setSnackBarMessage] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    try {
      const run = data.slice(-11, -3);
      const validator = data.slice(-3, -2);

      const isValid = calculateChileanRunValidator(run) === validator;

      const completeRun = `${run}${validator}`;

      if (!isValid) {
        throw new Error("Invalid QR code");
      }

      if (completeRun !== scannedData) {
        setScanned(true);
        setScannedData(completeRun);
        setSnackBarMessage(
          `Alumno con identificador ${completeRun} registrado`
        );
        try {
          takeAttendance({
            student_attendance_id: completeRun,
          }, courseId, activitySlug);
        } catch (error) {
          setSnackBarMessage("Error al registrar asistencia");
        }
      }
    } catch (error) {
      setSnackBarMessage("No estás escaneando el código de barras de la tuc");
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <ActivityIndicator animating={true} size={120} />
      </View>
    );
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={
          snackBarMessage !== "" ? undefined : handleBarCodeScanned
        }
        style={StyleSheet.absoluteFillObject}
      />
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
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    position: "absolute",
    bottom: 50,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  scannedText: {
    marginTop: 16,
    fontSize: 18,
    color: "#333",
    position: "absolute",
    bottom: 100,
  },
});

export default QrScan;
