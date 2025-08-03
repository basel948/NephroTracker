import { Tabs } from "expo-router";
import TabBar from "./tabBar";

export default function TabsLayout() {
  console.log("TabsLayout rendered");
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen name="dashboard" options={{ title: "Dashboard" }} />
      <Tabs.Screen name="graphs" options={{ title: "Graphs" }} />
      <Tabs.Screen name="inventory" options={{ title: "Inventory" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
