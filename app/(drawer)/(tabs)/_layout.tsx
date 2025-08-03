import { Tabs } from "expo-router";
import TabBar from "./tabBar";

export default function TabsLayout() {
  console.log("TabsLayout rendered");
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen
        name="dashboard"
        options={{ title: "Dashboard", headerShown: false }}
      />
      <Tabs.Screen
        name="graphs"
        options={{ title: "Graphs", headerShown: false }}
      />
      <Tabs.Screen
        name="inventory"
        options={{ title: "Inventory", headerShown: false }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: "Profile", headerShown: false }}
      />
    </Tabs>
  );
}
