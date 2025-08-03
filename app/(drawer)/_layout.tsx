import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {
  return (
    <Drawer>
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: "Dashboard",
          // You can also use a custom icon here!
        }}
      />
      {/* You can add more Drawer.Screens if you add more top-level screens */}
    </Drawer>
  );
}
