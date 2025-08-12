import { Slot } from "expo-router";

import { AuthProvider } from "@/src/auth/AuthProvider";
import { InventoryProvider } from "@/src/inventory/InventoryProvider";

export default function RootLayout() {
  return (
    <AuthProvider>
      <InventoryProvider>
        <Slot />
      </InventoryProvider>
    </AuthProvider>
  );
}
