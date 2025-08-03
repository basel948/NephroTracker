import { Drawer } from "expo-router/drawer";

export default function MainDrawerLayout() {
  return (
    <Drawer>
      <Drawer.Screen name="(tabs)" options={{ title: "Dashboard" }} />
      {/* Add other screens as needed */}
    </Drawer>
  );
}
