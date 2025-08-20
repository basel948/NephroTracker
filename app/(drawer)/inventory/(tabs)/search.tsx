import TitleWithLine from "@/components/TitleWithLine";
import { useInventory } from "@/src/inventory/InventoryProvider";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useCallback } from "react";

import React, { useMemo, useState } from "react";
import {
  FlatList,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function SearchInventory() {
  const router = useRouter();
  const { items } = useInventory();
  const [q, setQ] = useState("");

  useFocusEffect(
    useCallback(() => {
      // cleanup runs when screen loses focus (navigating away)
      return () => setQ("");
    }, [])
  );

  const rows = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    return items
      .filter((i) => i.name.toLowerCase().includes(term))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [items, q]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <TitleWithLine title="Search Inventory" />
      <View style={{ paddingHorizontal: 16, paddingBottom: 8 }}>
        <TextInput
          placeholder="Type to search…"
          placeholderTextColor="#6b7280"
          value={q}
          onChangeText={setQ}
          style={styles.search}
          autoFocus
        />
      </View>

      {!q ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>Start typing to find items…</Text>
        </View>
      ) : rows.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No results</Text>
        </View>
      ) : (
        <FlatList
          data={rows}
          keyExtractor={(r) => r.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setQ("");
                Keyboard.dismiss();
                router.replace(
                  `/(drawer)/inventory/(tabs)/${
                    item.supplierId
                  }?focus=${encodeURIComponent(item.id)}`
                );
              }}
              style={styles.row}
            >
              <Text style={[styles.cell, { flex: 5 }]} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={[styles.cell, { flex: 2, textAlign: "center" }]}>
                {item.qty} {item.unit}
              </Text>
              <Text
                style={[
                  styles.cell,
                  { flex: 2, textAlign: "right", color: "#07aa4b" },
                ]}
              >
                {item.supplierId}
              </Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  search: {
    height: 40,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e5e7eb",
  },
  cell: { fontSize: 14, color: "#111" },
  empty: { flex: 1, alignItems: "center", justifyContent: "center" },
  emptyText: { color: "#6b7280" },
});
