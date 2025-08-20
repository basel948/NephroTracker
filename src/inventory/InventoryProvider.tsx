// src/inventory/InventoryProvider.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { INITIAL_ITEMS } from "./mock";
import type { SupplierId } from "./suppliers";
import { ALL_SUPPLIERS } from "./suppliers";
import type { InventoryItem, InventoryMeta, Stocktake } from "./types";

const STORAGE = {
  items: "inv_items_v1",
  meta: "inv_meta_v1",
  stocktakes: "inv_stocktakes_v1",
};

type Ctx = {
  items: InventoryItem[];
  metaBySupplier: Record<SupplierId, InventoryMeta>;
  stocktakes: Stocktake[];
  adjust: (itemId: string, delta: number, userId: string) => void;
  updateUnit: (
    itemId: string,
    unit: InventoryItem["unit"],
    userId: string
  ) => void;
  submitStocktake: (
    supplierId: SupplierId,
    userId: string,
    note?: string
  ) => void;
  /** Dev helper: clears all inventory-related storage keys */
  __devResetStorage?: () => Promise<void>;
};

const Ctx = createContext<Ctx>(null as any);
const uuid = () => `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

/** Merge missing seeded items (by id) into an existing array. */
function mergeSeededItems(existing: InventoryItem[], seed: InventoryItem[]) {
  const existingIds = new Set(existing.map((i) => i.id));
  const missing = seed.filter((s) => !existingIds.has(s.id));
  if (missing.length === 0) return existing;
  const merged = [...existing, ...missing];
  return merged;
}

/** Ensure meta has an entry for all suppliers. */
function ensureAllSupplierMeta(
  meta: Partial<Record<SupplierId, InventoryMeta>>
): Record<SupplierId, InventoryMeta> {
  const out: Record<SupplierId, InventoryMeta> = { ...(meta as any) };
  for (const sid of ALL_SUPPLIERS) {
    if (!out[sid]) out[sid] = { supplierId: sid };
  }
  return out;
}

export function InventoryProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<InventoryItem[]>(INITIAL_ITEMS);
  const [metaBySupplier, setMeta] = useState<Record<SupplierId, InventoryMeta>>(
    {
      ELDAN: { supplierId: "ELDAN" },
      MAHER: { supplierId: "MAHER" },
      MEDS: { supplierId: "MEDS" },
    }
  );
  const [stocktakes, setStocktakes] = useState<Stocktake[]>([]);

  // ───────────────────────────────────────────────
  // Load from storage + ONE-TIME MIGRATION
  // ───────────────────────────────────────────────
  useEffect(() => {
    (async () => {
      try {
        const [i, m, s] = await Promise.all([
          AsyncStorage.getItem(STORAGE.items),
          AsyncStorage.getItem(STORAGE.meta),
          AsyncStorage.getItem(STORAGE.stocktakes),
        ]);

        // Items: parse or seed, then MERGE missing items from INITIAL_ITEMS
        let parsedItems: InventoryItem[] | null = null;
        if (i) {
          try {
            parsedItems = JSON.parse(i) as InventoryItem[];
          } catch {
            // corrupt/old format—fallback to seed
            parsedItems = null;
          }
        }
        const mergedItems = mergeSeededItems(parsedItems ?? [], INITIAL_ITEMS);
        setItems(mergedItems);

        // Meta: parse + ensure all suppliers present
        let parsedMeta: Partial<Record<SupplierId, InventoryMeta>> | null =
          null;
        if (m) {
          try {
            parsedMeta = JSON.parse(m);
          } catch {
            parsedMeta = null;
          }
        }
        const ensuredMeta = ensureAllSupplierMeta(parsedMeta ?? {});
        setMeta(ensuredMeta);

        // Stocktakes: parse or default
        let parsedStock: Stocktake[] | null = null;
        if (s) {
          try {
            parsedStock = JSON.parse(s) as Stocktake[];
          } catch {
            parsedStock = null;
          }
        }
        setStocktakes(parsedStock ?? []);

        // Persist the merged/ensured data back once (completes the migration)
        await Promise.all([
          AsyncStorage.setItem(STORAGE.items, JSON.stringify(mergedItems)),
          AsyncStorage.setItem(STORAGE.meta, JSON.stringify(ensuredMeta)),
          AsyncStorage.setItem(
            STORAGE.stocktakes,
            JSON.stringify(parsedStock ?? [])
          ),
        ]);

        // Optional: quick visibility by supplier in console
        // console.log(
        //   "Loaded items by supplier:",
        //   mergedItems.reduce((acc, r) => {
        //     acc[r.supplierId] = (acc[r.supplierId] ?? 0) + 1;
        //     return acc;
        //   }, {} as Record<string, number>)
        // );
      } catch (e) {
        console.warn("Inventory load failed", e);
      }
    })();
  }, []);

  // ───────────────────────────────────────────────
  // Persist on changes (normal operation)
  // ───────────────────────────────────────────────
  useEffect(() => {
    AsyncStorage.setItem(STORAGE.items, JSON.stringify(items)).catch(() => {});
  }, [items]);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE.meta, JSON.stringify(metaBySupplier)).catch(
      () => {}
    );
  }, [metaBySupplier]);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE.stocktakes, JSON.stringify(stocktakes)).catch(
      () => {}
    );
  }, [stocktakes]);

  // ───────────────────────────────────────────────
  // Mutations
  // ───────────────────────────────────────────────
  const adjust: Ctx["adjust"] = (itemId, delta, userId) => {
    setItems((prev) =>
      prev.map((r) =>
        r.id === itemId
          ? {
              ...r,
              qty: Math.max(0, r.qty + delta),
              updatedAt: new Date().toISOString(),
              updatedBy: userId,
            }
          : r
      )
    );
  };

  const updateUnit: Ctx["updateUnit"] = (itemId, unit, userId) => {
    setItems((prev) =>
      prev.map((r) =>
        r.id === itemId
          ? {
              ...r,
              unit,
              updatedAt: new Date().toISOString(),
              updatedBy: userId,
            }
          : r
      )
    );
  };

  const submitStocktake: Ctx["submitStocktake"] = (
    supplierId,
    userId,
    note
  ) => {
    const rec: Stocktake = {
      id: uuid(),
      supplierId,
      checkedAt: new Date().toISOString(),
      checkedBy: userId,
      note,
    };
    setStocktakes((prev) => [rec, ...prev]);
    setMeta((prev) => ({
      ...prev,
      [supplierId]: {
        supplierId,
        lastCheckedAt: rec.checkedAt,
        lastCheckedBy: userId,
      },
    }));
  };

  // Dev helper to clear the three keys (optional)
  const __devResetStorage = async () => {
    await Promise.all([
      AsyncStorage.removeItem(STORAGE.items),
      AsyncStorage.removeItem(STORAGE.meta),
      AsyncStorage.removeItem(STORAGE.stocktakes),
    ]);
  };

  const value = useMemo(
    () => ({
      items,
      metaBySupplier,
      stocktakes,
      adjust,
      updateUnit,
      submitStocktake,
      __devResetStorage,
    }),
    [items, metaBySupplier, stocktakes]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useInventory = () => useContext(Ctx);
