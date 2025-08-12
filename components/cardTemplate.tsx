// components/cardTemplate.tsx
import React, { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type CardTemplateProps = {
  title: string;
  icon: ReactNode;
  preview: ReactNode;
  onPress: () => void;
};

export default function CardTemplate({
  title,
  icon,
  preview,
  onPress,
}: CardTemplateProps) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.icon}>{icon}</View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.preview}>{preview}</View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "90%",
    borderRadius: 20,
    padding: 20,
    marginVertical: 12,
    backgroundColor: "#fff",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
    alignSelf: "center",
  },
  icon: { marginBottom: 12 },
  title: {
    fontWeight: "700",
    fontSize: 18,
    marginBottom: 10,
    color: "#222",
  },
  preview: { minHeight: 60, width: "100%" },
});
