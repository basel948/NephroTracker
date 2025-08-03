import { ScrollView, StyleSheet, View } from "react-native";

export default function ColorList({ color }: { color: string }) {
  console.log("ColorList rendered with color:", color);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {[1, 0.8, 0.5].map((opacity) => (
        <View
          key={opacity}
          style={[styles.color, { backgroundColor: color, opacity }]}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, paddingVertical: 10 },
  color: {
    width: "100%",
    height: 150,
    borderRadius: 25,
    borderCurve: "continuous",
    marginBottom: 15,
  },
});
