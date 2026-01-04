import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, View } from "react-native";

import { CalendarTab } from "@/components/ui/calendar/calendar-tab";
import { getCalendarStyles } from "@/components/ui/calendar/calendar.styles";
import { useTheme } from "@/contexts/theme-context";
import { useFetchTasks } from "@/hooks/useFetchTasks";
import { CommonColors, TextColors } from "@/constants/theme";

export default function CalendarScreen() {
  const { isDark } = useTheme();
  const styles = getCalendarStyles(isDark);
  const { tasks, isLoading } = useFetchTasks();

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar style={isDark ? "light" : "dark"} />
      {isLoading ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color={isDark ? CommonColors.white : TextColors.primary} />
        </View>
      ) : (
        <CalendarTab tasks={tasks} />
      )}
    </SafeAreaView>
  );
}
