import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Text,
  Dimensions,
} from "react-native";
import { useTheme } from "react-native-paper";

import { useAuth } from "@/hooks/authContext";

const Login = () => {
  const theme = useTheme();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const onSignInPress = async () => {
    try {
      await login(emailAddress, password);
    } catch (error) {
      console.error("Login error", error);
    }
  };

  return (
    <LinearGradient
      colors={["#1C5A76", theme.colors.primary]}
      style={styles.container}
    >
      <View style={{ alignItems: "center" }}>
        <Text
          style={{
            color: "white",
            fontSize: 36,
            fontWeight: "bold",
            marginBottom: 80,
          }}
        >
          Attendance UC
        </Text>
      </View>
      <Text style={styles.label}>Email</Text>
      <TextInput
        autoCapitalize="none"
        placeholder="ejemplo@uc.cl"
        value={emailAddress}
        onChangeText={setEmailAddress}
        style={styles.inputField}
      />
      <Text style={styles.label}>Contraseña</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.inputField}
      />

      <Pressable style={styles.button} onPress={onSignInPress}>
        <Text
          style={{
            color: "white",
            fontSize: 36,
            fontWeight: "bold",
          }}
        >
          Iniciar sesión
        </Text>
      </Pressable>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 40,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  label: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
  button: {
    marginTop: 20,
    padding: 10,
    alignItems: "center",
  },
});

export default Login;
