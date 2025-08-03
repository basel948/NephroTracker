import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import { useEffect } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => {
      router.replace("/(drawer)/(tabs)/dashboard");
    }, 3000);
    console.log(
      "Splash screen timeout set for 3 seconds, redirecting to dashboard"
    );
    return () => clearTimeout(t);
  }, []);
  // this will be the splash screen for the app, it will navigate to the dashboard after collecting all the necessary data from the database/backend
  console.log("Splash screen rendered, showing loading animation");
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.title}>
          Nephro<Text style={styles.subtitle}>Tracker</Text>
        </Text>
        <LottieView
          source={require("../assets/animations/loadingGif.json")}
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
