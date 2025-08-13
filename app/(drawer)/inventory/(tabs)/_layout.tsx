import TabBar from "@/components/TabBar";
import { Tabs } from "expo-router";
import React from "react";

export default function InventoryTabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#07aa4b",
        tabBarLabelStyle: { fontSize: 12, fontWeight: "700" },
      }}
    >
      <Tabs.Screen name="ELDAN" options={{ title: "ELDAN" }} />
      <Tabs.Screen name="MAHER" options={{ title: "Maher" }} />
      <Tabs.Screen name="MEDS" options={{ title: "Medications" }} />
    </Tabs>
  );
}
