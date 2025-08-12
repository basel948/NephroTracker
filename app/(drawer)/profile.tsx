import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { users } from "../../mocks/userData";

const MOCK_USER = users[0]; // Use the first user from the mock data

export default function ProfileScreen() {
  const [username, setUsername] = useState(MOCK_USER.username);
  const [password, setPassword] = useState(MOCK_USER.password);
  const [showPassword, setShowPassword] = useState(false);

  // Handle image change (for now just log, implement picker later)
  const handleChangeImage = () => {
    alert("Change image not implemented yet.");
  };

  return (
    <View style={styles.container}>
      {/* Main form section */}
      <View style={styles.formSection}>
        {/* Profile Picture (pressable for change) */}
        <Pressable
          onPress={handleChangeImage}
          style={({ hovered }) => [
            styles.imageWrapper,
            hovered && Platform.OS === "web" ? styles.imageHover : null,
          ]}
        >
          <Image source={{ uri: MOCK_USER.image }} style={styles.image} />
          <View style={styles.editIconWrapper}>
            <Feather name="plus" size={15} color="#fff" />
          </View>
        </Pressable>

        {/* Username */}
        <TextInput
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          placeholder="Username"
        />

        {/* Password with Eye Toggle */}
        <View style={styles.passwordContainer}>
          <TextInput
            value={password}
            onChangeText={setPassword}
            style={styles.passwordInput}
            placeholder="Password"
            secureTextEntry={!showPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity
            onPress={() => setShowPassword((v) => !v)}
            style={styles.eyeIcon}
          >
            <Feather
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* Footer info */}
      <View style={styles.footerInfo}>
        <View style={styles.row}>
          <Text style={styles.label}>Joined: </Text>
          <Text style={styles.value}>{MOCK_USER.joinedDate}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Last Login: </Text>
          <Text style={styles.value}>{MOCK_USER.lastLogin}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
    justifyContent: "space-between",
    alignItems: "center",
  },
  formSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  imageWrapper: {
    marginBottom: 40,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: "#07aa4b",
    padding: 2,
    position: "relative", // <-- add this
    ...(Platform.OS === "web" && { cursor: "pointer" }),
  },
  editIconWrapper: {
    position: "absolute",
    bottom: 10,
    right: 0,
    backgroundColor: "#07aa4bd3",
    borderRadius: 18,
    padding: 4,
    borderWidth: 2,
    borderColor: "trasparent",
    justifyContent: "center",
    alignItems: "center",
  },
  imageHover: {
    ...(Platform.OS === "web" && { boxShadow: "0 0 0 2px #1fe06680" }),
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  input: {
    width: 300,
    height: 44,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 25,
    marginBottom: 16,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
  },
  passwordContainer: {
    width: 300,
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 25,
    marginBottom: 16,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
  },
  passwordInput: { flex: 1, height: "100%" },
  eyeIcon: { marginLeft: 8, padding: 4 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    marginBottom: 2,
  },
  label: {
    fontWeight: "bold",
    color: "#07aa4b",
    fontSize: 16,
  },
  value: {
    fontSize: 16,
    color: "#222",
  },
  footerInfo: {
    width: "100%",
    alignItems: "center",
    marginBottom: 40,
  },
});
