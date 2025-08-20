import type { SupplierId } from "./suppliers";

// 👇 Broaden unit support + export a single source of truth for the dropdown
export type Unit = "pcs" | "box" | "bag" | "set" | "ml" | "L" | "mg" | "g";

export const UNIT_OPTIONS: Unit[] = [
  "pcs",
  "box",
  "bag",
  "set",
  "ml",
  "L",
  "mg",
  "g",
];

export type InventoryItem = {
  id: string;
  name: string;
  qty: number;
  unit: Unit; // 👈 now uses Unit
  supplierId: SupplierId;
  updatedAt?: string; // last qty change
  updatedBy?: string; // userId
};

export type InventoryMeta = {
  supplierId: SupplierId;
  lastCheckedAt?: string; // last stocktake time
  lastCheckedBy?: string; // userId
};

export type Stocktake = {
  id: string;
  supplierId: SupplierId;
  checkedAt: string;
  checkedBy: string; // userId
  note?: string;
};

export type { SupplierId } from "./suppliers";
