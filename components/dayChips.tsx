import type { Day } from "@/src/schedule/types";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const DAYS: Day[] = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export default function DayChips({
  value,
  onChange,
}: {
  value: Day;
  onChange: (d: Day) => void;
}) {
  return (
    <View style={styles.row}>
      {DAYS.map((d) => (
        <Pressable
          key={d}
          onPress={() => onChange(d)}
          style={[styles.chip, value === d && styles.chipActive]}
        >
          <Text style={[styles.txt, value === d && styles.txtActive]}>{d}</Text>
        </Pressable>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  row: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
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
