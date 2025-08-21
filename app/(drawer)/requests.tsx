import DayChips from "@/components/dayChips";
import ShiftChips from "@/components/ShiftChips";
import TitleWithLine from "@/components/TitleWithLine";
import { useAuth } from "@/src/auth/AuthProvider";
import { startOfWeekISO, useSchedule } from "@/src/schedule/ScheduleProvider";
import type { Day, Shift } from "@/src/schedule/types";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Narrow the shift type for requests (cannot be "OFF")
type RequestShift = Exclude<Shift, "OFF">;

export default function RequestsScreen() {
  const { user } = useAuth();
  const { requests, addRequest } = useSchedule();

  const [weekOf] = useState<string>(startOfWeekISO(new Date())); // current week
  const [day, setDay] = useState<Day>("SUN");
  const [shift, setShift] = useState<RequestShift>("MORNING");
  const [note, setNote] = useState("");

  const mine = useMemo(
    () => requests.filter((r) => r.userId === (user?.id ?? "anon")),
    [requests, user?.id]
  );

  const submit = () => {
    addRequest({
      userId: user?.id ?? "anon",
      username: (user as any)?.username ?? "anonymous", // adjust if your User type adds username later
      weekOf,
      day,
      shift,
      note: note.trim() || undefined,
    });
    setNote("");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <TitleWithLine title="Requests" />

      <View style={{ paddingHorizontal: 16, paddingBottom: 8 }}>
        <Text style={styles.label}>Week of</Text>
        <Text style={styles.weekBadge}>{weekOf}</Text>

        <Text style={styles.label}>Day</Text>
        <DayChips value={day} onChange={setDay} />

        <Text style={styles.label}>Shift</Text>
        <ShiftChips
          value={shift}
          allowed={["MORNING", "NOON", "NIGHT", "VACATION"] as const}
          onChange={(s) => setShift(s as RequestShift)}
        />

        <Text style={styles.label}>Note (optional)</Text>
        <TextInput
          placeholder="e.g. clinic appointment 10:00"
          value={note}
          onChangeText={setNote}
          style={styles.input}
        />

        <TouchableOpacity style={styles.submit} onPress={submit}>
          <Text style={styles.submitTxt}>Submit Request</Text>
        </TouchableOpacity>
      </View>

      <TitleWithLine title="My recent requests" />
      <FlatList
        data={mine}
        keyExtractor={(r) => r.id}
        renderItem={({ item }) => (
          <View style={styles.reqCard}>
            <Text style={styles.reqTitle}>
              {item.day} · {item.shift}
            </Text>
            <Text style={styles.reqSub}>
              {item.weekOf} • {item.username}
            </Text>
            {!!item.note && <Text style={styles.reqNote}>{item.note}</Text>}
            <Text
              style={[
                styles.status,
                item.status === "pending" && { color: "#a16207" },
              ]}
            >
              {item.status}
            </Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 16, paddingHorizontal: 16 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  label: { marginTop: 12, marginBottom: 6, color: "#111", fontWeight: "700" },
  weekBadge: {
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
  },
  submit: {
    backgroundColor: "#07aa4b",
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 14,
    alignItems: "center",
  },
  submitTxt: { color: "#fff", fontWeight: "800" },
  reqCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 12,
    marginVertical: 6,
  },
  reqTitle: { fontWeight: "800", color: "#111" },
  reqSub: { color: "#6b7280", marginTop: 2 },
  reqNote: { color: "#111", marginTop: 6 },
  status: { marginTop: 8, fontWeight: "800" },
});
