import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  BrandColors,
  CommonColors,
  DarkColors,
  LightColors,
} from "@/constants/theme";
import { useTheme } from "@/contexts/theme-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NavButton } from "./nav-button";
import { ToggleTheme } from "./toggle-theme";

const getStyles = (isDark: boolean, bottomInset: number) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
      borderTopWidth: 1,
      borderTopColor: isDark ? DarkColors.darkBorder : LightColors.lightBorder,
      paddingTop: 8,
      paddingBottom: bottomInset,
      position: "relative",
      minHeight: 60,
      backgroundColor: isDark ? DarkColors.darkText : CommonColors.white,
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

export function CustomTabBar({ state, descriptors }: BottomTabBarProps) {
  const { isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = getStyles(isDark, insets.bottom);

  const handleAddPress = () => {
    // Handle add task action
    console.log("Add task pressed");
  };

  const isRouteFocused = (routeName: string) => {
    return state.routes[state.index].name === routeName;
  };

  const handleTabPress = (routeName: string) => {
    const route = state.routes.find((r) => r.name === routeName);
    if (route) {
      const { navigation } = descriptors[route.key];
      navigation.navigate(route.name);
    }
  };

  return (
    <View style={styles.container}>
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
        <Ionicons name="add" size={32} color={CommonColors.white} />
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
