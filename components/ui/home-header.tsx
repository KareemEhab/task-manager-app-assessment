import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { LogoutModal } from "@/components/modals/logout-modal";
import {
  BrandColors,
  CommonColors,
  DarkColors,
  LightColors,
  TextColors,
} from "@/constants/theme";
import { useTheme } from "@/contexts/theme-context";

type HomeHeaderProps = {
  userName?: string;
};

export function HomeHeader({ userName = "Krish Shah" }: HomeHeaderProps) {
  const { isDark, toggleTheme } = useTheme();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    if (parts.length === 0) return "";
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (
      parts[0].charAt(0).toUpperCase() +
      parts[parts.length - 1].charAt(0).toUpperCase()
    );
  };

  const initials = getInitials(userName);

  return (
    <>
      <View
        style={[
          styles.container,
          {
            backgroundColor: isDark ? DarkColors.darkText : LightColors.light4,
          },
        ]}
      >
        <View style={styles.avatarContainer}>
          <View
            style={[
              styles.avatar,
              {
                backgroundColor: isDark
                  ? DarkColors.darkBorder
                  : LightColors.light2,
              },
            ]}
          >
            <Text
              style={[
                styles.avatarText,
                {
                  color: isDark ? CommonColors.white : BrandColors.main,
                },
              ]}
            >
              {initials}
            </Text>
          </View>
        </View>
        <View style={styles.welcomeSection}>
          <Text
            style={[
              styles.welcomeText,
              {
                color: isDark ? CommonColors.white : TextColors.secondary,
              },
            ]}
          >
            Welcome Back!
          </Text>
          <Text
            style={[
              styles.nameText,
              {
                color: isDark ? BrandColors.lighter : BrandColors.main,
              },
            ]}
          >
            {userName}
          </Text>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[
              styles.themeToggleButton,
              {
                backgroundColor: isDark
                  ? DarkColors.darkBorder
                  : LightColors.light2,
              },
            ]}
            onPress={toggleTheme}
            activeOpacity={0.7}
          >
            <Ionicons
              name={isDark ? "sunny-outline" : "moon-outline"}
              size={20}
              color={isDark ? CommonColors.white : TextColors.primary}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.logoutButton,
              {
                backgroundColor: isDark
                  ? DarkColors.darkBorder
                  : LightColors.light2,
              },
            ]}
            onPress={() => setShowLogoutModal(true)}
            activeOpacity={0.7}
          >
            <Ionicons
              name="log-out-outline"
              size={20}
              color={isDark ? CommonColors.white : TextColors.primary}
            />
          </TouchableOpacity>
        </View>
      </View>

      <LogoutModal
        visible={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 16,
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 16,
    fontWeight: "600",
  },
  welcomeSection: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 4,
  },
  nameText: {
    fontSize: 24,
    fontWeight: "500",
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  themeToggleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  logoutButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
