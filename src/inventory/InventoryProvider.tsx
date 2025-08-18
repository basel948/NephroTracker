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
};

const Ctx = createContext<Ctx>(null as any);
const uuid = () => `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

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

  useEffect(() => {
    (async () => {
      try {
        const [i, m, s] = await Promise.all([
          AsyncStorage.getItem(STORAGE.items),
          AsyncStorage.getItem(STORAGE.meta),
          AsyncStorage.getItem(STORAGE.stocktakes),
        ]);
        if (i) setItems(JSON.parse(i));
        if (m) setMeta(JSON.parse(m));
        if (s) setStocktakes(JSON.parse(s));
      } catch (e) {
        console.warn("Inventory load failed", e);
      }
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE.items, JSON.stringify(items));
  }, [items]);
  useEffect(() => {
    AsyncStorage.setItem(STORAGE.meta, JSON.stringify(metaBySupplier));
  }, [metaBySupplier]);
  useEffect(() => {
    AsyncStorage.setItem(STORAGE.stocktakes, JSON.stringify(stocktakes));
  }, [stocktakes]);

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

  const value = useMemo(
    () => ({
      items,
      metaBySupplier,
      stocktakes,
      adjust,
      updateUnit,
      submitStocktake,
    }),
    [items, metaBySupplier, stocktakes]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useInventory = () => useContext(Ctx);
