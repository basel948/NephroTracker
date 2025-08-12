//this bottom tabbar is NOT IN USE.
// It is replaced by the drawer navigation in the app layout and card in the dashboard layout/
// this file is kept for reference and future use if needed.

import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const primaryColor = "#07aa4b";
const greyColor = "#444444ff";

const icons = {
  dashboard: (props) => <AntDesign name="home" size={26} {...props} />,
  inventory: (props) => <MaterialIcons name="inventory" size={26} {...props} />,
  graphs: (props) => <Entypo name="line-graph" size={26} {...props} />,
  profile: (props) => <AntDesign name="user" size={26} {...props} />,
};

export default function TabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.tabbar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel ?? options.title ?? route.name;

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

        const Icon = icons[route.name];
        if (!Icon) return null;

        return (
          <TouchableOpacity
            key={route.name}
            style={styles.tabbarItem}
            onPress={onPress}
            onLongPress={() =>
              navigation.emit({ type: "tabLongPress", target: route.key })
            }
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
  );
}

const styles = StyleSheet.create({
  tabbar: {
    position: "absolute",
    bottom: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 25,
    // borderCurve: "continuous", //removed
    overflow: "hidden", // added
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  tabbarItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
});
