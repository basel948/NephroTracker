// mock/graphData.ts

export const monthlyUsage = [
  { itemName: "Saline Bags", month: "2025-07", quantityUsed: 150 },
  { itemName: "Dialyzers", month: "2025-07", quantityUsed: 120 },
  { itemName: "IV Sets", month: "2025-07", quantityUsed: 85 },
  { itemName: "Saline Bags", month: "2025-06", quantityUsed: 170 },
  { itemName: "Dialyzers", month: "2025-06", quantityUsed: 110 },
  { itemName: "IV Sets", month: "2025-06", quantityUsed: 92 },
];

export const restockEvents = [
  { itemName: "Saline Bags", date: "2025-07-05", quantityAdded: 200 },
  { itemName: "Dialyzers", date: "2025-07-10", quantityAdded: 150 },
  { itemName: "IV Sets", date: "2025-07-18", quantityAdded: 90 },
];

export const topUsedItems = [
  { itemName: "Saline Bags", quantityUsed: 150 },
  { itemName: "Dialyzers", quantityUsed: 120 },
];

export const lowStockItems = [
  { itemName: "IV Sets", currentQuantity: 8, threshold: 10 },
  { itemName: "Catheters", currentQuantity: 3, threshold: 5 },
];

export const trends = [
  {
    itemName: "Saline Bags",
    currentMonth: 150,
    previousMonth: 170,
    trend: "down", // "up", "down", or "same"
  },
  {
    itemName: "Dialyzers",
    currentMonth: 120,
    previousMonth: 110,
    trend: "up",
  },
];
