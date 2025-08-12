// app/(drawer)/inventory/[supplier].tsx
import TitleWithLine from "@/components/TitleWithLine";
import { useLocalSearchParams } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  ListRenderItem,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useAuth } from "@/src/auth/AuthProvider";
import { useInventory } from "@/src/inventory/InventoryProvider";
import type { InventoryItem, SupplierId } from "@/src/inventory/types";

export default function SupplierInventory() {
  const params = useLocalSearchParams<{ supplier?: string }>();
  const SUPPLIER = (params.supplier?.toUpperCase() as SupplierId) ?? "ELDAN";

  const { user } = useAuth();
  const { items, metaBySupplier, adjust, submitStocktake } = useInventory();
  const [q, setQ] = useState("");

  const rows = useMemo(
    () =>
      items
        .filter((i) => i.supplierId === SUPPLIER)
        .filter(
          (i) =>
            !q.trim() || i.name.toLowerCase().includes(q.trim().toLowerCase())
        )
        .sort((a, b) => a.name.localeCompare(b.name)),
    [items, q, SUPPLIER]
  );

  const meta = metaBySupplier[SUPPLIER];
  const lastCheckedTxt = meta?.lastCheckedAt
    ? new Date(meta.lastCheckedAt).toLocaleString()
    : "—";

  const onSubmit = () => {
    if (Platform.OS === "ios") {
      Alert.prompt("Submit stock check", "Optional note", (text) =>
        submitStocktake(SUPPLIER, user?.id ?? "anon", text || undefined)
      );
    } else {
      Alert.alert("Submit stock check", `Mark ${SUPPLIER} as checked now?`, [
        { text: "Cancel", style: "cancel" },
        {
          text: "Submit",
          onPress: () => submitStocktake(SUPPLIER, user?.id ?? "anon"),
        },
      ]);
    }
  };

  const renderRow: ListRenderItem<InventoryItem> = ({ item, index }) => (
    <View style={[styles.tr, index % 2 === 1 && styles.trAlt]}>
      <Text numberOfLines={1} style={[styles.td, styles.name]}>
        {item.name}
      </Text>

      <View style={[styles.qtyCell]}>
        <TouchableOpacity
          onPress={() => adjust(item.id, -1, user?.id ?? "anon")}
          style={styles.qbtn}
        >
          <Text style={styles.qtxt}>−</Text>
        </TouchableOpacity>
        <Text style={styles.qty}>{item.qty}</Text>
        <TouchableOpacity
          onPress={() => adjust(item.id, +1, user?.id ?? "anon")}
          style={styles.qbtn}
        >
          <Text style={styles.qtxt}>+</Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.td, styles.unit]}>{item.unit.toUpperCase()}</Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <TitleWithLine title={`${SUPPLIER} Inventory`} />

      {user?.role === "MANAGER" && (
        <View style={styles.auditBar}>
          <Text style={styles.auditTxt}>
            Last checked: {lastCheckedTxt}
            {meta?.lastCheckedBy ? ` • by ${meta.lastCheckedBy}` : ""}
          </Text>
          <TouchableOpacity style={styles.auditBtn} onPress={onSubmit}>
            <Text style={styles.auditBtnTxt}>Submit check</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={{ paddingHorizontal: 16, paddingBottom: 8 }}>
        <TextInput
          placeholder="Search item…"
          value={q}
          onChangeText={setQ}
          style={styles.search}
        />
      </View>

      <View style={[styles.tr, styles.thead]}>
        <Text style={[styles.th, styles.name]}>Name</Text>
        <Text style={[styles.th, styles.qtyHeader]}>Quantity</Text>
        <Text style={[styles.th, styles.unit]}>Unit</Text>
      </View>

      <FlatList
        data={rows}
        keyExtractor={(r) => r.id}
        renderItem={renderRow}
        contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 24 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  auditBar: {
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "#f8fafc",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  auditTxt: { fontSize: 12, color: "#374151" },
  auditBtn: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "#07aa4b",
  },
  auditBtnTxt: { color: "#fff", fontWeight: "700", fontSize: 12 },

  search: {
    height: 40,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
  },

  thead: {
    backgroundColor: "#f8fafc",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
    marginHorizontal: 12,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  tr: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  trAlt: { backgroundColor: "#fafafa" },

  th: { fontSize: 13, fontWeight: "700", color: "#111" },
  td: { fontSize: 14, color: "#111" },

  name: { flex: 6, paddingRight: 8 },
  qtyHeader: { flex: 3, textAlign: "center" },
  qtyCell: {
    flex: 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  unit: { flex: 2, textAlign: "right", paddingRight: 4 },

  qbtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#07aa4b",
  },
  qtxt: { color: "#fff", fontWeight: "800", fontSize: 16 },
  qty: { minWidth: 28, textAlign: "center", fontWeight: "700" },
});
