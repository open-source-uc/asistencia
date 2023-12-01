import { BarCodeScanner } from "expo-barcode-scanner";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Snackbar, ActivityIndicator } from "react-native-paper";

import { takeAttendance } from "@/api/attendance";
import { calculateChileanRunValidator } from "@/utils/auxFunctions";

function QrScan({ courseSlug, activitySlug }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scannedData, setScannedData] = useState("");
  const [snackBarMessage, setSnackBarMessage] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    try {
      const run = data.slice(-11, -3);
      const validator = data.slice(-3, -2);

      const isValid = calculateChileanRunValidator(run) === validator;

      const completeRun = `${run}${validator}`;

      if (!isValid) {
        throw new Error("Invalid QR code");
      }

      if (completeRun !== scannedData) {
        setScannedData(completeRun);
        setSnackBarMessage(
          `Alumno con identificador ${completeRun} registrado`,
        );
        try {
          await takeAttendance(
            completeRun,
            courseSlug as string,
            activitySlug as string,
          );
        } catch {
          setSnackBarMessage("Error al registrar asistencia");
        }
      }
    } catch {
      setSnackBarMessage("No estás escaneando el código de barras de la tuc");
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <ActivityIndicator animating size={120} />
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
