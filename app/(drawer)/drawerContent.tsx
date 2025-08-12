// app/(drawer)/drawerContent.tsx
import { AntDesign, Entypo, Feather, MaterialIcons } from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  type DrawerContentComponentProps,
} from "@react-navigation/drawer";
import { Href, useRouter, useSegments } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ACTIVE_COLOR = "#07aa4b";
const INACTIVE_COLOR = "#444444ff";

type DrawerItem = {
  label: string;
  icon: (color: string) => React.ReactNode;
  route: Href; // keep simple; use concrete strings for now
  match: string;
};

const drawerTabs: DrawerItem[] = [
  {
    label: "Dashboard",
    icon: (color: string) => <AntDesign name="home" size={24} color={color} />,
    route: "/(drawer)/dashboard" as Href,
    match: "dashboard",
  },
  {
    label: "Graphs",
    icon: (color: string) => (
      <Entypo name="line-graph" size={24} color={color} />
    ),
    route: "/(drawer)/graphs" as Href,
    match: "graphs",
  },
  {
    label: "Inventory",
    icon: (color: string) => (
      <MaterialIcons name="inventory" size={24} color={color} />
    ),
    // Jump straight to the ELDAN tab (concrete path string)
    route: "/(drawer)/inventory/(tabs)/ELDAN" as Href,
    match: "inventory",
  },
];

const drawerProfile: DrawerItem[] = [
  {
    label: "Profile",
    icon: (color: string) => <AntDesign name="user" size={24} color={color} />,
    route: "/(drawer)/profile" as Href,
    match: "profile",
  },
];

export default function DrawerContent(props: DrawerContentComponentProps) {
  const router = useRouter();
  const segments = useSegments();
  const activeTab = segments[segments.length - 1] as string;

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={styles.section}>
          {drawerTabs.map((item) => {
            const isActive = activeTab === item.match;
            return (
              <TouchableOpacity
                key={item.label}
                style={[styles.drawerItem, isActive && styles.activeDrawerItem]}
                onPress={() => {
                  router.replace(item.route);
                  props.navigation.closeDrawer();
                }}
              >
                {item.icon(isActive ? ACTIVE_COLOR : INACTIVE_COLOR)}
                <Text
                  style={[
                    styles.drawerLabel,
                    isActive && { color: ACTIVE_COLOR, fontWeight: "bold" },
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={{ flex: 1 }} />

        <View style={styles.bottomSection}>
          {drawerProfile.map((item) => {
            const isActive = activeTab === item.match;
            return (
              <TouchableOpacity
                key={item.label}
                style={[styles.drawerItem, isActive && styles.activeDrawerItem]}
                onPress={() => {
                  router.replace(item.route);
                  props.navigation.closeDrawer();
                }}
              >
                {item.icon(isActive ? ACTIVE_COLOR : INACTIVE_COLOR)}
                <Text
                  style={[
                    styles.drawerLabel,
                    isActive && { color: ACTIVE_COLOR, fontWeight: "bold" },
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
          <TouchableOpacity
            style={styles.drawerItem}
            onPress={() => {
              router.replace("/login" as Href);
              props.navigation.closeDrawer();
            }}
          >
            <Feather name="log-out" size={24} color={INACTIVE_COLOR} />
            <Text style={styles.drawerLabel}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  section: { paddingVertical: 8 },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 2,
  },
  activeDrawerItem: { backgroundColor: "#07aa4b33" },
  drawerLabel: {
    marginLeft: 16,
    fontSize: 16,
    color: INACTIVE_COLOR,
    fontWeight: "500",
  },
  bottomSection: {
    paddingBottom: 36,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
});
