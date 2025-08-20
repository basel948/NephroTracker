// src/inventory/suppliers.ts
export type SupplierId = "ELDAN" | "MAHER" | "MEDS";

export const ALL_SUPPLIERS: SupplierId[] = ["ELDAN", "MAHER", "MEDS"];

export const SUPPLIER_TITLES: Record<SupplierId, string> = {
  ELDAN: "ELDAN",
  MAHER: "Maher",
  MEDS: "Medications",
};
