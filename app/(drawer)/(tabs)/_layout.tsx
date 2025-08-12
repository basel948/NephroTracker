//this bottom tabbar is NOT IN USE.
// It is replaced by the drawer navigation in the app layout and card in the dashboard layout/
// this file is kept for reference and future use if needed.

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
