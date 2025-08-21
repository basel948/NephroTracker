import { Feather, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export type UserContact = {
  username: string;
  role: string;
  image: string;
  phone: string;
  secondaryPhone?: string;
  email: string;
};

export default function UserCard({ user }: { user: UserContact }) {
  const call = (num?: string) => num && Linking.openURL(`tel:${num}`);
  const email = (addr?: string) => addr && Linking.openURL(`mailto:${addr}`);

  return (
    <View style={styles.card}>
      <Image source={{ uri: user.image }} style={styles.avatar} />
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={styles.name} numberOfLines={1}>
          {user.username}
        </Text>
        <Text style={styles.role} numberOfLines={1}>
          {user.role}
        </Text>

        <View style={styles.row}>
          <Feather name="phone" size={16} color="#6b7280" />
          <Text style={styles.value} numberOfLines={1}>
            {user.phone}
          </Text>
          <Pressable style={styles.action} onPress={() => call(user.phone)}>
            <Text style={styles.actionTxt}>Call</Text>
          </Pressable>
        </View>

        {user.secondaryPhone ? (
          <View style={styles.row}>
            <Feather name="smartphone" size={16} color="#6b7280" />
            <Text style={styles.value} numberOfLines={1}>
              {user.secondaryPhone}
            </Text>
            <Pressable
              style={styles.action}
              onPress={() => call(user.secondaryPhone)}
            >
              <Text style={styles.actionTxt}>Call</Text>
            </Pressable>
          </View>
        ) : null}

        <View style={styles.row}>
          <MaterialIcons name="email" size={16} color="#6b7280" />
          <Text style={styles.value} numberOfLines={1}>
            {user.email}
          </Text>
          <Pressable style={styles.action} onPress={() => email(user.email)}>
            <Text style={styles.actionTxt}>Email</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    borderColor: "#07aa4b",
    borderWidth: 0.5,
    shadowRadius: 10,
    elevation: 3,
    ...(Platform.OS === "web" && { borderWidth: 1, borderColor: "#e5e7eb" }),
  },
  avatar: { width: 56, height: 56, borderRadius: 28 },
  name: { fontSize: 16, fontWeight: "700", color: "#111" },
  role: { fontSize: 12, color: "#07aa4b", marginTop: 2, marginBottom: 6 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 6,
  },
  value: { flex: 1, color: "#111" },
  action: {
    borderColor: "#07aa4b",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  actionTxt: { color: "#07aa4b", fontWeight: "700", fontSize: 12 },
});
