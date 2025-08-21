import TitleWithLine from "@/components/TitleWithLine";
import { users as MOCK } from "@/mocks/userData";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import UserCard, { UserContact } from "../../components/userCard";
export default function Users() {
  const [q, setQ] = useState("");

  const data: UserContact[] = useMemo(
    () =>
      MOCK.map((u) => ({
        username: u.username,
        role: u.role,
        image: u.image,
        phone: u.phone,
        secondaryPhone: u.secondaryPhone,
        email: u.email,
      }))
        .filter((u) => {
          const t = q.trim().toLowerCase();
          if (!t) return true;
          return (
            u.username.toLowerCase().includes(t) ||
            u.role.toLowerCase().includes(t) ||
            u.phone.toLowerCase().includes(t) ||
            (u.secondaryPhone ?? "").toLowerCase().includes(t) ||
            u.email.toLowerCase().includes(t)
          );
        })
        .sort((a, b) => a.username.localeCompare(b.username)),
    [q]
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <TitleWithLine title="Staff Directory" />
      <View style={{ paddingHorizontal: 16, paddingBottom: 8 }}>
        <TextInput
          placeholder="Search name, phone, email…"
          placeholderTextColor="#6b7280"
          value={q}
          onChangeText={setQ}
          style={styles.search}
        />
      </View>
      <FlatList
        data={data}
        keyExtractor={(u) => u.username}
        renderItem={({ item }) => <UserCard user={item} />}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
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
});
