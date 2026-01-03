import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

import { CalendarTab } from "@/components/ui/calendar/calendar-tab";
import { getCalendarStyles } from "@/components/ui/calendar/calendar.styles";
import { useTheme } from "@/contexts/theme-context";
import { tasks } from "@/data/tasks";

export default function CalendarScreen() {
  const { isDark } = useTheme();
  const styles = getCalendarStyles(isDark);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar style={isDark ? "light" : "dark"} />
      <CalendarTab tasks={tasks} />
    </SafeAreaView>
  );
}
