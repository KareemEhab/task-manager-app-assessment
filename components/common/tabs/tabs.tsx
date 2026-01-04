import { Text, TouchableOpacity, View } from "react-native";

import { useTheme } from "@/contexts/theme-context";
import { getTabsStyles } from "./tabs.styles";

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
  const styles = getTabsStyles(isDark);

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.value;
        return (
          <TouchableOpacity
            key={tab.value}
            style={[styles.tab, isActive && styles.tabActive]}
            onPress={() => onTabChange(tab.value)}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
