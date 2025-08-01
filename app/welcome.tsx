import { useRootNavigationState, useRouter } from "expo-router";
import { useEffect } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

export default function Welcome() {
  const router = useRouter();
  const navigationState = useRootNavigationState();

  useEffect(() => {
    // Don't run redirect until the root stack is mounted
    if (!navigationState?.key) return;

    const timer = setTimeout(() => {
      router.replace("/(tabs)/dashboard");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigationState?.key]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Nephro<Text style={styles.subtitle}>Tracker</Text>
      </Text>
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
  title: {
    fontSize: 38,
    fontWeight: "bold",
    color: "black",
    fontFamily: Platform.OS === "ios" ? "San Francisco" : "Roboto",
  },
  subtitle: { fontSize: 38, fontWeight: "300", color: "#07aa4b" },
});
