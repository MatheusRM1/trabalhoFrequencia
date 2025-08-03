import { Stack } from "expo-router";
import "react-native-reanimated";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(drawer)" />
      </Stack>
    </QueryClientProvider>
  );
}
