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
  const { isDark } = useTheme();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

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
        <View style={styles.welcomeSection}>
          <Text
            style={[
              styles.welcomeText,
              {
                color: isDark ? DarkColors.dark4 : TextColors.secondary,
              },
            ]}
          >
            Welcome Back!
          </Text>
          <Text
            style={[
              styles.nameText,
              {
                color: BrandColors.main,
              },
            ]}
          >
            {userName}
          </Text>
        </View>

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
  logoutButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
