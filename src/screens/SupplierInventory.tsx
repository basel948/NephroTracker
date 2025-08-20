// src/screens/SupplierInventory.tsx
import TitleWithLine from "@/components/TitleWithLine";
import { useAuth } from "@/src/auth/AuthProvider";
import { useInventory } from "@/src/inventory/InventoryProvider";
import type { InventoryItem, SupplierId } from "@/src/inventory/types";
import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  ListRenderItem,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const UNITS = [
  { label: "Box", value: "box" },
  { label: "Pcs", value: "pcs" },
] as const;

const TABBAR_APPROX_HEIGHT = 72;

export default function SupplierInventory({
  supplierId,
  hideSearch = true,
  focusItemId,
}: {
  supplierId: SupplierId;
  hideSearch?: boolean;
  /** optional: when provided, auto-scroll & highlight this row */
  focusItemId?: string;
}) {
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const { items, metaBySupplier, adjust, submitStocktake, updateUnit } =
    useInventory();
  const [q, setQ] = useState("");

  const listRef = useRef<FlatList<InventoryItem>>(null);
  const [flashId, setFlashId] = useState<string | null>(null);

  const rows = useMemo(
    () =>
      items
        .filter((i) => i.supplierId === supplierId)
        .filter(
          (i) =>
            !q.trim() || i.name.toLowerCase().includes(q.trim().toLowerCase())
        )
        .sort((a, b) => a.name.localeCompare(b.name)),
    [items, q, supplierId]
  );

  // Auto-scroll + brief highlight for focused item
  useEffect(() => {
    if (!focusItemId) return;
    const idx = rows.findIndex((r) => r.id === focusItemId);
    if (idx < 0) return;

    setFlashId(focusItemId);
    const t1 = setTimeout(() => {
      listRef.current?.scrollToIndex({
        index: idx,
        animated: true,
        viewPosition: 0.5,
      });
    }, 80);
    const t2 = setTimeout(() => setFlashId(null), 1600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [focusItemId, rows]);

  const meta = metaBySupplier[supplierId];
  const lastCheckedTxt = meta?.lastCheckedAt
    ? new Date(meta.lastCheckedAt).toLocaleString()
    : "—";

  const onSubmitAudit = () => {
    if (Platform.OS === "ios") {
      Alert.prompt("Submit stock check", "Optional note", (text) =>
        submitStocktake(supplierId, user?.id ?? "anon", text || undefined)
      );
    } else {
      Alert.alert("Submit stock check", `Mark ${supplierId} as checked now?`, [
        { text: "Cancel", style: "cancel" },
        {
          text: "Submit",
          onPress: () => submitStocktake(supplierId, user?.id ?? "anon"),
        },
      ]);
    }
  };

  const onSubmitFilled = () => {
    Alert.alert("Submitted", "Your stocktake has been sent.");
  };

  const renderRow: ListRenderItem<InventoryItem> = ({ item, index }) => (
    <View
      style={[
        styles.tr,
        index % 2 === 1 && styles.trAlt,
        item.id === flashId && { backgroundColor: "#ecfdf5" }, // flash highlight
      ]}
    >
      <Text numberOfLines={1} style={[styles.td, styles.name]}>
        {item.name}
      </Text>

      <View style={[styles.qtyCell]}>
        <TextInput
          value={String(item.qty)}
          onChangeText={(text) => {
            const numericValue = parseInt(text, 10);
            if (!isNaN(numericValue) && numericValue >= 0) {
              const delta = numericValue - item.qty;
              if (delta !== 0) adjust(item.id, delta, user?.id ?? "anon");
            }
          }}
          keyboardType="numeric"
          selectTextOnFocus
          returnKeyType="done"
          style={styles.qtyInput}
        />
      </View>

      <View style={[styles.unitCell]}>
        <Dropdown
          data={UNITS as unknown as any[]}
          labelField="label"
          valueField="value"
          value={item.unit}
          onChange={(opt: { value: "box" | "pcs" }) =>
            updateUnit(item.id, opt.value, user?.id ?? "anon")
          }
          style={styles.dropdown}
          containerStyle={styles.dropdownMenu}
          placeholderStyle={styles.dropdownText}
          selectedTextStyle={styles.dropdownText}
          itemTextStyle={styles.dropdownItemText}
          activeColor="#f3f4f6"
          placeholder=""
          renderRightIcon={() => (
            <AntDesign
              name="caretdown"
              size={12}
              color="#6b7280"
              style={{ marginRight: 2 }}
            />
          )}
        />
      </View>
    </View>
  );

  const Footer = () => (
    <View style={styles.footerWrap}>
      <TouchableOpacity style={styles.submitBtn} onPress={onSubmitFilled}>
        <Text style={styles.submitBtnTxt}>Submit</Text>
      </TouchableOpacity>
      <View style={{ height: insets.bottom + TABBAR_APPROX_HEIGHT + 8 }} />
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={TABBAR_APPROX_HEIGHT}
      >
        {/* Title with extra top/bottom margin */}
        <TitleWithLine title={`${supplierId} Inventory`} />

        {user?.role === "MANAGER" && (
          <View style={styles.auditBar}>
            <Text style={styles.auditTxt}>
              Last checked: {lastCheckedTxt}
              {meta?.lastCheckedBy ? ` • by ${meta.lastCheckedBy}` : ""}
            </Text>
            <TouchableOpacity style={styles.auditBtn} onPress={onSubmitAudit}>
              <Text style={styles.auditBtnTxt}>Submit check</Text>
            </TouchableOpacity>
          </View>
        )}

        {!hideSearch && (
          <View style={{ paddingHorizontal: 16, paddingBottom: 8 }}>
            <TextInput
              placeholder="Search item…"
              placeholderTextColor="#6b7280"
              value={q}
              onChangeText={setQ}
              style={styles.search}
            />
          </View>
        )}

        {/* Table header — full width */}
        <View style={[styles.tr, styles.thead]}>
          <Text style={[styles.th, styles.name]}>Name</Text>
          <Text style={[styles.th, styles.qtyHeader]}>Quantity</Text>
          <Text style={[styles.th, styles.unit]}>Unit</Text>
        </View>

        {/* Table body — full width */}
        <FlatList
          ref={listRef}
          data={rows}
          keyExtractor={(r) => r.id}
          renderItem={renderRow}
          style={{ flex: 1, alignSelf: "stretch" }}
          contentContainerStyle={{ paddingBottom: 16 }}
          ListFooterComponent={Footer}
          onScrollToIndexFailed={(e) => {
            listRef.current?.scrollToOffset({
              offset: e.averageItemLength * e.index,
              animated: true,
            });
            setTimeout(() => {
              listRef.current?.scrollToIndex({
                index: e.index,
                animated: true,
              });
            }, 200);
          }}
        />
      </KeyboardAvoidingView>
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
  qtyInput: {
    width: 60,
    height: 40,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: "#fff",
    fontSize: 14,
    color: "#111",
    textAlign: "center",
  },
  th: { fontSize: 13, fontWeight: "700", color: "#111" },
  td: { fontSize: 14, color: "#111" },
  name: { flex: 6, paddingLeft: 4 },
  qtyHeader: { flex: 3, textAlign: "center", paddingLeft: 24 },
  qtyCell: { flex: 3, alignItems: "center", justifyContent: "center" },
  unit: { flex: 2, textAlign: "left", paddingLeft: 38 },
  unitCell: { flex: 2, alignItems: "flex-end", paddingRight: 8 },
  dropdown: {
    height: 40,
    width: 70,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  dropdownMenu: { borderRadius: 8, borderColor: "#e5e7eb" },
  dropdownText: { fontSize: 12, color: "#111", fontWeight: "600" },
  dropdownItemText: { fontSize: 12, color: "#111" },
  footerWrap: { paddingHorizontal: 12, paddingTop: 8 },
  submitBtn: {
    backgroundColor: "#07aa4b",
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 8,
    alignItems: "center",
    width: 170,
    justifyContent: "center",
    alignSelf: "center",
  },
  submitBtnTxt: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
