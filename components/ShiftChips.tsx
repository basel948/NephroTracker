import type { Shift } from "@/src/schedule/types";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

// Default allowed shifts for the picker (no "OFF" here).
const DEFAULT_ALLOWED = [
  "MORNING",
  "NOON",
  "NIGHT",
  "VACATION",
] as const satisfies readonly Shift[];

export default function ShiftChips({
  value,
  onChange,
  allowed = DEFAULT_ALLOWED,
}: {
  value: Shift;
  onChange: (s: Shift) => void;
  /** Override to control which shifts are shown */
  allowed?: readonly Shift[];
}) {
  return (
    <View style={styles.row}>
      {allowed.map((s) => (
        <Pressable
          key={s}
          onPress={() => onChange(s)}
          style={[styles.chip, value === s && styles.chipActive]}
        >
          <Text style={[styles.txt, value === s && styles.txtActive]}>{s}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 8 },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  chipActive: { backgroundColor: "#07aa4b1a", borderColor: "#07aa4b" },
  txt: { color: "#111", fontWeight: "600", fontSize: 12 },
  txtActive: { color: "#07aa4b" },
});
