import { Slot } from "expo-router";

import { AuthProvider } from "@/src/auth/AuthProvider";
import { InventoryProvider } from "@/src/inventory/InventoryProvider";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <AuthProvider>
      <InventoryProvider>
        <SafeAreaProvider>
          <Slot />
        </SafeAreaProvider>
      </InventoryProvider>
    </AuthProvider>
  );
}
