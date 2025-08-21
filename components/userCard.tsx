import { Feather, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  ActionSheetIOS,
  Alert,
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

  // WhatsApp helpers
  const toWaNumber = (raw?: string) => (raw ?? "").replace(/[^\d]/g, ""); // expects intl format with country code
  const openWhatsApp = async (num?: string, text?: string) => {
    if (!num) return;
    const phone = toWaNumber(num);
    const candidates = [
      {
        scheme: "whatsapp://send",
        url: `whatsapp://send?phone=${phone}${
          text ? `&text=${encodeURIComponent(text)}` : ""
        }`,
      },
      {
        scheme: "whatsapp-business://send",
        url: `whatsapp-business://send?phone=${phone}${
          text ? `&text=${encodeURIComponent(text)}` : ""
        }`,
      },
    ];
    // Try app schemes first
    for (const c of candidates) {
      try {
        if (await Linking.canOpenURL(c.scheme)) return Linking.openURL(c.url);
      } catch {}
    }
    // Fallback to universal link
    return Linking.openURL(
      `https://wa.me/${phone}${text ? `?text=${encodeURIComponent(text)}` : ""}`
    );
  };

  const chooseCall = (num?: string) => {
    if (!num) return;
    if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          title: num,
          options: ["Cancel", "Regular call", "WhatsApp"],
          cancelButtonIndex: 0,
        },
        (i) => {
          if (i === 1) call(num);
          if (i === 2) openWhatsApp(num, `Hi ${user.username}`);
        }
      );
    } else {
      Alert.alert("Call with", num, [
        { text: "Regular call", onPress: () => call(num) },
        {
          text: "WhatsApp",
          onPress: () => openWhatsApp(num, `Hi ${user.username}`),
        },
        { text: "Cancel", style: "cancel" },
      ]);
    }
  };

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
          <Pressable
            style={styles.action}
            onPress={() => chooseCall(user.phone)}
          >
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
              onPress={() => chooseCall(user.secondaryPhone)}
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
