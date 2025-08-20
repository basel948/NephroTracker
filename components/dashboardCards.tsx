// app/(drawer)/dashboardCards.ts
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native"; // <-- add

export type DashboardCard = {
  title: string;
  icon: React.ReactNode;
  preview: React.ReactNode;
  navigateTo: string;
};

export const dashboardCards: DashboardCard[] = [
  {
    title: "Graphs",
    icon: <Entypo name="line-graph" size={36} color="#07aa4b" />,
    preview: <GraphPreview />,
    navigateTo: "/(drawer)/graphs",
  },
  {
    title: "Inventory",
    icon: <MaterialIcons name="inventory" size={36} color="#07aa4b" />,
    preview: <InventoryPreview />,
    navigateTo: "/(drawer)/inventory/(tabs)/ELDAN",
  },
  // duplicates kept intentionally for layout demo
  {
    title: "Graphs",
    icon: <Entypo name="line-graph" size={36} color="#07aa4b" />,
    preview: <GraphPreview />,
    navigateTo: "/(drawer)/graphs",
  },
  {
    title: "Inventory",
    icon: <MaterialIcons name="inventory" size={36} color="#07aa4b" />,
    preview: <InventoryPreview />,
    navigateTo: "/(drawer)/inventory/(tabs)/ELDAN",
  },
  {
    title: "Graphs",
    icon: <Entypo name="line-graph" size={36} color="#07aa4b" />,
    preview: <GraphPreview />,
    navigateTo: "/(drawer)/graphs",
  },
  {
    title: "Inventory",
    icon: <MaterialIcons name="inventory" size={36} color="#07aa4b" />,
    preview: <InventoryPreview />,
    navigateTo: "/(drawer)/inventory/(tabs)/ELDAN",
  },
];

function GraphPreview() {
  return (
    <View>
      <Text>See your data trends</Text>
    </View>
  );
}
function InventoryPreview() {
  return (
    <View>
      <Text>Manage your stock</Text>
    </View>
  );
}
