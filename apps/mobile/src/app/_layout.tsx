import { useFonts } from "expo-font";
import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { PaperProvider } from "react-native-paper";

import { AuthProvider, useAuth } from "@/hooks/authContext";
import theme from "@/theme";

const InitialLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    "RedHatDisplay Bold": require("@/../assets/fonts/RedHatDisplay-Bold.ttf"),
    "RedHatDisplay Regular": require("@/../assets/fonts/RedHatDisplay-Regular.ttf"),
    "RedHatDisplay SemiBold": require("@/../assets/fonts/RedHatDisplay-SemiBold.ttf"),
    "RedHatDisplay ExtraBold": require("@/../assets/fonts/RedHatDisplay-ExtraBold.ttf"),
    "RedHatDisplay Black": require("@/../assets/fonts/RedHatDisplay-Black.ttf"),
    "RedHatDisplay Light": require("@/../assets/fonts/RedHatDisplay-Light.ttf"),
    "RedHatDisplay Medium": require("@/../assets/fonts/RedHatDisplay-Medium.ttf"),
  });

  const inTabsGroup = segments[0] === "(auth)";

  useEffect(() => {
    if (isLoading || !fontsLoaded) return;

    if (isAuthenticated && !inTabsGroup) {
      router.replace("/courses");
    } else if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isLoading, fontsLoaded, inTabsGroup, router]);

  return <Slot />;
};

const RootLayout = () => {
  return (
    <AuthProvider>
      <PaperProvider theme={theme as any}>
        <InitialLayout />
      </PaperProvider>
    </AuthProvider>
  );
};

export default RootLayout;
