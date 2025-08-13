import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const primaryColor = "#07aa4b";
const greyColor = "#444444ff";

const icons: Record<string, (p: { color: string }) => React.ReactElement> = {
  ELDAN: (props) => <MaterialIcons name="inventory" size={24} {...props} />,
  MAHER: (props) => <Entypo name="shop" size={24} {...props} />,
  MEDS: (props) => <AntDesign name="medicinebox" size={24} {...props} />,
};

export default function TabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.tabbar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = (options.tabBarLabel ??
            options.title ??
            route.name) as string;

          if (["_sitemap", "+not-found"].includes(route.name)) return null;

          const isFocused = state.index === index;
          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const Icon =
            icons[route.name] ??
            (() => <AntDesign name="appstore-o" size={24} color={greyColor} />);

          return (
            <TouchableOpacity
              key={route.key}
              style={styles.tabbarItem}
              onPress={onPress}
            >
              <Icon color={isFocused ? primaryColor : greyColor} />
              <Text
                style={{
                  color: isFocused ? primaryColor : greyColor,
                  fontSize: 11,
                }}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 16,
    alignItems: "center",
  },
  tabbar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 22,
    gap: 8,
    // nice floating look
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
    ...(Platform.OS === "web" && { borderWidth: 1, borderColor: "#e5e7eb" }),
  },
  tabbarItem: {
    flex: 1,
    minWidth: 90,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
});
