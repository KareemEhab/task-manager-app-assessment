import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { router } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BrandColors, DarkColors } from "@/constants/theme";
import { useTheme } from "@/contexts/theme-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NavButton } from "./nav-button";
import { ToggleTheme } from "./toggle-theme";

export function CustomTabBar({ state, descriptors }: BottomTabBarProps) {
  const { isDark } = useTheme();
  const insets = useSafeAreaInsets();

  const handleAddPress = () => {
    // Handle add task action
    console.log("Add task pressed");
  };

  const getRouteIndex = (routeName: string) => {
    return state.routes.findIndex((r) => r.name === routeName);
  };

  const isRouteFocused = (routeName: string) => {
    return state.routes[state.index].name === routeName;
  };

  const handleTabPress = (routeName: string) => {
    const route = state.routes.find((r) => r.name === routeName);
    if (route) {
      router.push(`/(tabs)/${routeName}` as any);
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
          borderTopColor: isDark ? "#374151" : "#E5E7EB",
          paddingBottom: insets.bottom,
        },
      ]}
    >
      <View style={styles.navButtons}>
        <NavButton
          icon={
            <Ionicons
              name="home"
              size={24}
              color={
                isRouteFocused("index")
                  ? isDark
                    ? BrandColors.lighter
                    : BrandColors.main
                  : DarkColors.dark3
              }
            />
          }
          label="Home"
          isSelected={isRouteFocused("index")}
          onPress={() => handleTabPress("index")}
        />
        <NavButton
          icon={
            <Ionicons
              name="calendar-outline"
              size={24}
              color={
                isRouteFocused("calendar")
                  ? isDark
                    ? BrandColors.lighter
                    : BrandColors.main
                  : DarkColors.dark3
              }
            />
          }
          label="Calendar"
          isSelected={isRouteFocused("calendar")}
          onPress={() => handleTabPress("calendar")}
        />
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddPress}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={32} color="#FFFFFF" />
      </TouchableOpacity>

      <View style={styles.navButtons}>
        <NavButton
          icon={
            <Ionicons
              name="chatbubble-outline"
              size={24}
              color={
                isRouteFocused("chat")
                  ? isDark
                    ? BrandColors.lighter
                    : BrandColors.main
                  : DarkColors.dark3
              }
            />
          }
          label="Chat"
          isSelected={isRouteFocused("chat")}
          onPress={() => handleTabPress("chat")}
        />
        <ToggleTheme isSelected={false} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    borderTopWidth: 1,
    paddingTop: 8,
    position: "relative",
    minHeight: 60,
  },
  navButtons: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  addButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: BrandColors.main,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: "50%",
    marginLeft: -28,
    top: -28,
    shadowColor: BrandColors.main,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
