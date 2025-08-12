// app/(drawer)/dashboardCards.ts
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import React from "react";

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
    navigateTo: "/(drawer)/inventory",
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
    navigateTo: "/(drawer)/inventory",
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
    navigateTo: "/(drawer)/inventory",
  },
  // Add more cards here
];

// Dummy preview components for now
function GraphPreview() {
  return <>See your data trends</>;
}
function InventoryPreview() {
  return <>Manage your stock</>;
}
