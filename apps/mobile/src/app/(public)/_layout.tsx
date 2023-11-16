import { Stack } from "expo-router";

const PublicLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="login"></Stack.Screen>
    </Stack>
  );
};

export default PublicLayout;
