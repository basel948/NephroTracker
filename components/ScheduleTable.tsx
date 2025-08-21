import type { Day, Role, ScheduleWeek, Shift } from "@/src/schedule/types";
import React, { useMemo } from "react";
import { I18nManager, ScrollView, StyleSheet, Text, View } from "react-native";

const DAYS: Day[] = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const COLS: Day[] = I18nManager.isRTL ? [...DAYS].reverse() : DAYS;

const DAY_LABEL: Record<Day, string> = {
  SUN: "Sun",
  MON: "Mon",
  TUE: "Tue",
  WED: "Wed",
  THU: "Thu",
  FRI: "Fri",
  SAT: "Sat",
};

// Only MORNING/NOON get colors; others show "—"
const SHIFT_META: Record<Shift, { bg?: string; fg?: string; label: string }> = {
  MORNING: { bg: "#ecfdf5", fg: "#047857", label: "07–14" },
  NOON: { bg: "#fff7ed", fg: "#c2410c", label: "14–21" },
  NIGHT: { label: "—" },
  VACATION: { label: "—" },
  OFF: { label: "—" },
};

type CellState = { shift: Shift; inCharge?: boolean };
type Row = {
  role: Role;
  userId: string;
  username: string;
  byDay: Partial<Record<Day, CellState>>;
};

function toRows(week: ScheduleWeek) {
  const map = new Map<string, Row>();
  for (const c of week.cells) {
    if (!map.has(c.userId)) {
      map.set(c.userId, {
        role: c.role,
        userId: c.userId,
        username: c.username,
        byDay: {},
      });
    }
    map.get(c.userId)!.byDay[c.day] = { shift: c.shift, inCharge: c.inCharge };
  }
  const all = [...map.values()].sort((a, b) =>
    a.username.localeCompare(b.username)
  );
  return {
    nurses: all.filter((r) => r.role === "NURSE"),
    aux: all.filter((r) => r.role === "AUX"),
  };
}

export default function ScheduleTable({ week }: { week: ScheduleWeek }) {
  const { nurses, aux } = useMemo(() => toRows(week), [week]);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>
          {/* Header */}
          <View style={styles.headerRow}>
            <View style={[styles.nameCell, styles.headerCell]}>
              <Text style={styles.headerTxt}>Name</Text>
            </View>
            {COLS.map((d) => (
              <View key={d} style={[styles.cell, styles.headerCell]}>
                <Text style={styles.headerTxt}>{DAY_LABEL[d]}</Text>
              </View>
            ))}
          </View>

          {/* Body – vertical scroll (entire table moves together) */}
          <ScrollView showsVerticalScrollIndicator={false}>
            {[...nurses, "SEP", ...aux].map((r, idx) => {
              if (r === "SEP") {
                return <View key={`sep-${idx}`} style={styles.separator} />;
              }
              const row = r as Row;
              return (
                <View key={row.userId} style={styles.bodyRow}>
                  <View style={styles.nameCell}>
                    <Text style={styles.nameTxt} numberOfLines={1}>
                      {row.username}
                    </Text>
                  </View>

                  {COLS.map((d) => {
                    const cell = row.byDay[d];
                    const s: Shift = cell?.shift ?? "OFF";
                    const meta = SHIFT_META[s] ?? { label: "—" };
                    const isLead =
                      row.role === "NURSE" &&
                      (s === "MORNING" || s === "NOON") &&
                      !!cell?.inCharge;

                    return (
                      <View
                        key={`${row.userId}-${d}`}
                        style={[
                          styles.cell,
                          meta.bg && { backgroundColor: meta.bg },
                          isLead && styles.leadCell,
                        ]}
                      >
                        <Text
                          style={[
                            styles.shiftTxt,
                            meta.fg && { color: meta.fg, fontWeight: "800" },
                          ]}
                        >
                          {meta.label}
                          {isLead ? "  ★" : ""}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              );
            })}
            <View style={{ height: 12 }} />
          </ScrollView>
        </View>
      </ScrollView>

      {/* Legend */}
      <View style={styles.legend}>
        <LegendSwatch color="#ecfdf5" label="Morning 07–14" />
        <LegendSwatch color="#fff7ed" label="Noon 14–21" />
        <LegendSwatch color="#fde68a" label="★ Nurse in charge" border />
      </View>
    </View>
  );
}

function LegendSwatch({
  color,
  label,
  border,
}: {
  color: string;
  label: string;
  border?: boolean;
}) {
  return (
    <View style={styles.legendItem}>
      <View
        style={[
          styles.legendBox,
          { backgroundColor: color },
          border && { borderWidth: 2, borderColor: "#f59e0b" },
        ]}
      />
      <Text style={styles.legendTxt}>{label}</Text>
    </View>
  );
}

const CELL_W = 96;
const ROW_H = 44;

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    backgroundColor: "#f8fafc",
  },
  headerCell: {
    height: ROW_H,
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderRightColor: "#e5e7eb",
  },
  headerTxt: { fontWeight: "800", color: "#111" },

  bodyRow: {
    flexDirection: "row",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e5e7eb",
  },

  nameCell: {
    width: 160,
    height: ROW_H,
    justifyContent: "center",
    paddingHorizontal: 10,
    borderRightWidth: 1,
    borderRightColor: "#e5e7eb",
    backgroundColor: "#fff",
  },
  nameTxt: { fontSize: 13, color: "#111", fontWeight: "700" },

  cell: {
    width: CELL_W,
    height: ROW_H,
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderRightColor: "#e5e7eb",
  },
  shiftTxt: { fontSize: 12, color: "#111" },

  separator: {
    height: 6,
    backgroundColor: "#000",
    opacity: 0.1,
    marginVertical: 8,
  },

  leadCell: {
    borderWidth: 2,
    borderColor: "#f59e0b",
    backgroundColor: "#fde68a",
  },

  legend: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
    marginBottom: 6,
  },
  legendBox: { width: 16, height: 16, borderRadius: 4 },
  legendTxt: { color: "#374151", fontSize: 12 },
});
