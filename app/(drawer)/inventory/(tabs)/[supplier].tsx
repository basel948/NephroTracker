// app/(drawer)/inventory/(tabs)/[supplier].tsx
import TitleWithLine from "@/components/TitleWithLine";
import { AntDesign } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React, { useMemo, useState } from "react";
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
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useAuth } from "@/src/auth/AuthProvider";
import { useInventory } from "@/src/inventory/InventoryProvider";
import type { InventoryItem, SupplierId } from "@/src/inventory/types";

// external UI bits
import { Dropdown } from "react-native-element-dropdown";

// keep units aligned with your types ("box" | "pcs")
const UNITS = [
  { label: "Box", value: "box" },
  { label: "Pcs", value: "pcs" },
] as const;

// If you tweak your TabBar size, adjust this one number.
const TABBAR_APPROX_HEIGHT = 72; // px (includes its own bottom margin)

export default function SupplierInventory({
  supplierOverride,
}: {
  supplierOverride?: SupplierId;
}) {
  const insets = useSafeAreaInsets();

  const params = useLocalSearchParams<{ supplier?: string }>();
  const SUPPLIER =
    supplierOverride ??
    (params.supplier?.toUpperCase() as SupplierId) ??
    "ELDAN";

  const { user } = useAuth();
  const { items, metaBySupplier, adjust, submitStocktake, updateUnit } =
    useInventory();
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

  const onSubmitAudit = () => {
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

  const onSubmitFilled = () => {
    Alert.alert("Submitted", "Your stocktake has been sent.");
    // TODO: integrate with real save
  };

  const renderRow: ListRenderItem<InventoryItem> = ({ item, index }) => (
    <View style={[styles.tr, index % 2 === 1 && styles.trAlt]}>
      {/* Name */}
      <Text numberOfLines={1} style={[styles.td, styles.name]}>
        {item.name}
      </Text>

      {/* Quantity – manual numeric input */}
      <View style={styles.qtyCell}>
        <TextInput
          value={item.qty.toString()}
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

      {/* Unit – Dropdown */}
      <View style={styles.unitCell}>
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

  // Footer: button that appears only when you scroll to bottom,
  // and sits above the floating TabBar thanks to the spacer.
  const Footer = () => (
    <View style={styles.footerWrap}>
      <TouchableOpacity style={styles.submitBtn} onPress={onSubmitFilled}>
        <Text style={styles.submitBtnTxt}>Submit</Text>
      </TouchableOpacity>

      {/* This spacer ensures the button itself won’t be hidden by the TabBar */}
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
        <TitleWithLine title={`${SUPPLIER} Inventory`} />

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
          // keep a little breathing room, but main “above tabbar” space is in the Footer spacer
          contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 16 }}
          ListFooterComponent={Footer}
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
    width: 68,
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
  name: { flex: 6, paddingRight: 8 },
  qtyHeader: { flex: 3, textAlign: "center" },
  qtyCell: { flex: 3, alignItems: "center", justifyContent: "center" },
  unit: { flex: 2, textAlign: "left", paddingLeft: 16, paddingRight: 4 },
  unitCell: { flex: 2, alignItems: "flex-end", paddingRight: 4 },
  dropdown: {
    height: 40,
    width: 68,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  dropdownMenu: { borderRadius: 8, borderColor: "#e5e7eb" },
  dropdownText: { fontSize: 12, color: "#111" },
  dropdownItemText: { fontSize: 12, color: "#111" },

  // Footer (scrolls with the list; shows only at the end)
  footerWrap: {
    paddingHorizontal: 12,
    paddingTop: 8,
  },
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
