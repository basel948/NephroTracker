import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import LoginButton from "./loginbutton";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👈 Add this

  const handleLogin = () => {
    router.replace("/welcome");
  };
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.title}>
          Nephro<Text style={styles.subtitle}>Tracker</Text>
        </Text>
      </View>
      <TextInput
        placeholder="Username"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Password"
          style={styles.passwordInput}
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowPassword((prev) => !prev)}
        >
          <Feather
            name={showPassword ? "eye-off" : "eye"}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
      <LoginButton onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  row: { flexDirection: "column", alignItems: "center", marginBottom: 100 },
  title: {
    color: "black",
    fontSize: 38,
    fontWeight: "bold",
    fontFamily: Platform.OS === "ios" ? "San Francisco" : "Roboto",
  },
  subtitle: {
    color: "#07aa4b",
    fontSize: 38,
    fontWeight: "light",
    fontFamily:
      Platform.OS === "ios" ? "HelveticaNeue-Light" : "sans-serif-light",
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
  passwordInput: {
    flex: 1,
    height: "100%",
  },
  eyeIcon: {
    marginLeft: 8,
    padding: 4,
  },
});
