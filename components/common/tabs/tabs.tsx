import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import {
  BrandColors,
  CommonColors,
  DarkColors,
  LightColors,
  TextColors,
} from "@/constants/theme";
import { useTheme } from "@/contexts/theme-context";

type Tab = {
  label: string;
  value: string;
};

type TabsProps = {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (value: string) => void;
};

export function Tabs({ tabs, activeTab, onTabChange }: TabsProps) {
  const { isDark } = useTheme();
  const styles = getStyles(isDark);

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.value;
        return (
          <TouchableOpacity
            key={tab.value}
            style={[
              styles.tab,
              isActive && styles.tabActive,
              {
                backgroundColor: isActive
                  ? isDark
                    ? DarkColors.darkBorder
                    : TextColors.secondary
                  : "transparent",
              },
            ]}
            onPress={() => onTabChange(tab.value)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.tabText,
                isActive && styles.tabTextActive,
                {
                  color: isActive
                    ? CommonColors.white
                    : isDark
                      ? DarkColors.dark4
                      : TextColors.secondary,
                },
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      gap: 8,
    },
    tab: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
    },
    tabActive: {
      // Background color is set inline based on theme
    },
    tabText: {
      fontSize: 14,
      fontWeight: "500",
    },
    tabTextActive: {
      fontWeight: "600",
    },
  });

