import type { SupplierId } from "@/src/inventory/types";
import { Tabs } from "expo-router";
import React from "react";

import { ALL_SUPPLIERS } from "@/src/inventory/suppliers";

export default function InventoryTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#07aa4b",
        tabBarLabelStyle: { fontSize: 12, fontWeight: "700" },
      }}
    >
      {ALL_SUPPLIERS.map((name: SupplierId) => (
        <Tabs.Screen key={name} name={name} options={{ title: name }} />
      ))}
    </Tabs>
  );
}
