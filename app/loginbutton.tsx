import { Platform, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function LoginButton({ onPress }: { onPress: () => void }) {
  console.log("LoginButton rendered");
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>Login</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#07aa4b",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 1,
    fontFamily:
      Platform.OS === "ios" ? "HelveticaNeue-Light" : "sans-serif-light",
  },
});
