import { useRouter } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    // Short timeout ensures the RootLayout is mounted
    const t = setTimeout(() => {
      router.replace("./splash");
    }, 0);

    return () => clearTimeout(t);
  }, []);

  return <View style={{ flex: 1, backgroundColor: "#fff" }} />;
}
