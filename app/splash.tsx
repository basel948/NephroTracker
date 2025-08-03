import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

export default function Splash() {
  const router = useRouter();
  useEffect(() => {
    const t = setTimeout(() => {
      router.replace("./login");
    }, 2000);
    return () => clearTimeout(t);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.title}>
          Nephro<Text style={styles.subtitle}>Tracker</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  row: { flexDirection: "column", alignItems: "center" },
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
});
