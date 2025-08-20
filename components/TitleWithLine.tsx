import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function TitleWithLine({ title }: { title: string }) {
  return (
    <View style={styles.wrap}>
      <View style={styles.line} />
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    marginTop: 16,
    marginBottom: 16,
    justifyContent: "center",
  },
  line: {
    position: "absolute",
    left: 16,
    right: 16,
    height: 1,
    backgroundColor: "#e5e7eb",
  },
  text: {
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
  },
});
