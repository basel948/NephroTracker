import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React from "react";
import type { TextStyle, ViewStyle } from "react-native";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const fallbackActive = "#07aa4b";
const fallbackInactive = "#444444ff";

const icons: Record<string, (p: { color: string }) => React.ReactElement> = {
  ELDAN: (props) => <MaterialIcons name="inventory" size={24} {...props} />,
  MAHER: (props) => <Entypo name="shop" size={24} {...props} />,
  MEDS: (props) => <AntDesign name="medicinebox" size={24} {...props} />,
  search: (props) => <AntDesign name="search1" size={22} {...props} />,
};

export default function TabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const bottomOffset = Math.max(16, insets.bottom + 8);

  return (
    <View style={[styles.wrapper, { bottom: bottomOffset }]}>
      <View style={styles.tabbar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];

          if (["_sitemap", "+not-found"].includes(route.name)) return null;

          const label = (options.tabBarLabel ??
            options.title ??
            route.name) as string;
          const isFocused = state.index === index;

          const activeColor = options.tabBarActiveTintColor ?? fallbackActive;
          const inactiveColor =
            options.tabBarInactiveTintColor ?? fallbackInactive;

          const color = isFocused ? activeColor : inactiveColor;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented)
              navigation.navigate(route.name, route.params);
          };

          const Icon =
            icons[route.name] ??
            (() => (
              <AntDesign name="appstore-o" size={24} color={inactiveColor} />
            ));

          const labelStyle = (options.tabBarLabelStyle ?? {}) as TextStyle;
          const itemStyle = (options.tabBarItemStyle ?? {}) as ViewStyle;

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={[styles.tabbarItem, itemStyle]} // 👈 allow margin/padding from options
            >
              <Icon color={color} />
              <Text
                numberOfLines={1}
                style={[
                  {
                    color,
                    fontSize: 11,
                    fontWeight: "700",
                    // default spacing if none provided; can be overridden by labelStyle
                    marginTop: 6,
                    marginBottom: 6,
                  },
                  labelStyle, // 👈 user-provided label margins win
                ]}
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
    alignItems: "center",
  },
  tabbar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 22,
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
    // ❌ remove gap so label margins actually affect spacing
    // gap: 4,
  },
});
