import { useTheme } from "@react-navigation/native";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

function Spinner() {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator animating color={colors.primary} />
    </View>
  );
}

export default Spinner;
