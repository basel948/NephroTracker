import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import { useEffect } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/dashboard");
    }, 5000);

    return () => clearTimeout(timer);
  }, []);
  // this will be the splash screen for the app, it will navigate to the dashboard after collecting all the necessary data from the database/backend

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.title}>
          Nephro<Text style={styles.subtitle}>Tracker</Text>
        </Text>
        <LottieView
          source={require("../assets/animations/Abstract Isometric Loader #1.json")}
          autoPlay
          loop
          style={styles.lottie}
        />
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
  lottie: { width: 300, height: 300 },
});
