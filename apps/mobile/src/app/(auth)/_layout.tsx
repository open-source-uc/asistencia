import { Ionicons } from "@expo/vector-icons";
import { Tabs, useNavigation } from "expo-router";
import { Pressable } from "react-native";
import { useTheme } from "react-native-paper";

import { useAuth } from "@/hooks/authContext";

const LogoutButton = () => {
  const { logout } = useAuth();
  const doLogout = () => {
    logout();
  };

  return (
    <Pressable onPress={doLogout} style={{ marginRight: 10 }}>
      <Ionicons name="log-out-outline" size={24} color="white" />
    </Pressable>
  );
};

const BackButton = () => {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <Pressable onPress={goBack} style={{ marginLeft: 10 }}>
      <Ionicons name="arrow-back-outline" size={24} color="white" />
    </Pressable>
  );
};

const TabsPage = () => {
  const theme = useTheme();
  const { isSignedIn } = { isSignedIn: true };

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerTintColor: "#fff",
        tabBarStyle: { display: "none" },
      }}
    >
      <Tabs.Screen
        name="courses"
        options={{
          headerTitle: "Courses",
          headerRight: () => <LogoutButton />,
        }}
        redirect={!isSignedIn}
      />
      <Tabs.Screen
        name="activities"
        options={{
          headerTitle: "Activities",
          headerLeft: () => <BackButton />,
          headerRight: () => <LogoutButton />,
        }}
        redirect={!isSignedIn}
      />
      <Tabs.Screen
        name="takeAttendance"
        options={{
          headerTitle: "Take Attendance",
          headerLeft: () => <BackButton />,
          headerRight: () => <LogoutButton />,
        }}
        redirect={!isSignedIn}
      />
    </Tabs>
  );
};

export default TabsPage;
