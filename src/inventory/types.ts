import type { SupplierId } from "./suppliers";

export type InventoryItem = {
  id: string;
  name: string;
  qty: number;
  unit: "box" | "pcs";
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
