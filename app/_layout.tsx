import { Slot } from "expo-router";

import { AuthProvider } from "@/src/auth/AuthProvider";
import { InventoryProvider } from "@/src/inventory/InventoryProvider";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ScheduleProvider } from "@/src/schedule/ScheduleProvider";

export default function RootLayout() {
  return (
    <AuthProvider>
      <InventoryProvider>
        <ScheduleProvider>
          <SafeAreaProvider>
            <Slot />
          </SafeAreaProvider>
        </ScheduleProvider>
      </InventoryProvider>
    </AuthProvider>
  );
}
