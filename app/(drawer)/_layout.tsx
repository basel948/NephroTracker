// app/(drawer)/_layout.tsx

import { AntDesign } from "@expo/vector-icons";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Drawer } from "expo-router/drawer";
import { Platform, Pressable, Text, View } from "react-native";
import DrawerContent from "./drawerContent";

function isDrawerOpen(navigation: DrawerNavigationProp<any>) {
  const state = navigation.getState?.();
  if (!state?.history) return false;
  return state.history.some((entry) => entry.type === "drawer");
}

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={({ navigation }) => {
        const drawerOpen = isDrawerOpen(navigation);

        return {
          headerShown: true,
          // Custom header with colored app name
          headerTitle: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "#000",
                  letterSpacing: 1,
                  fontFamily:
                    Platform.OS === "ios" ? "San Francisco" : "Roboto",
                }}
              >
                Nephro
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  color: "#07aa4b",
                  letterSpacing: 1,
                  fontFamily:
                    Platform.OS === "ios"
                      ? "HelveticaNeue-Light"
                      : "sans-serif-light",
                }}
              >
                Tracker
              </Text>
            </View>
          ),
          headerTitleAlign: "center", // Ensures center alignment on Android/iOS
          headerLeft: () => (
            <Pressable
              onPress={() =>
                drawerOpen ? navigation.closeDrawer() : navigation.openDrawer()
              }
              style={{ marginLeft: 18 }}
            >
              <AntDesign
                name={drawerOpen ? "menufold" : "menuunfold"}
                size={28}
                color="#07aa4b"
              />
            </Pressable>
          ),
        };
      }}
      drawerContent={(props) => <DrawerContent {...props} />}
    />
  );
}
