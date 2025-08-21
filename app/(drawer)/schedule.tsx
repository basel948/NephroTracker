import ScheduleTable from "@/components/ScheduleTable";
import TitleWithLine from "@/components/TitleWithLine";
import { useSchedule } from "@/src/schedule/ScheduleProvider";
import React from "react";
import { SafeAreaView, View } from "react-native";

export default function ScheduleScreen() {
  const { weeks } = useSchedule();
  const week = weeks[0]; // current week (replace with selector later)

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <TitleWithLine title={`Weekly Schedule · ${week.weekOf}`} />
      <View style={{ flex: 1 }}>
        <ScheduleTable week={week} />
      </View>
    </SafeAreaView>
  );
}
