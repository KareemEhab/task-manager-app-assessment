import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { CommonColors, TextColors } from "@/constants/theme";
import { useTheme } from "@/contexts/theme-context";
import { Task } from "@/data/tasks";
import { useCalendar } from "@/hooks/useCalendar";
import { getCalendarStyles } from "./calendar.styles";
import { MonthYearPicker } from "./month-year-picker";

type CalendarTabProps = {
  tasks: Task[];
};

export function CalendarTab({ tasks }: CalendarTabProps) {
  const { isDark } = useTheme();
  const styles = getCalendarStyles(isDark);
  const [showMonthYearModal, setShowMonthYearModal] = useState(false);

  const {
    selectedDate,
    currentMonth,
    currentYear,
    daysOfMonth,
    tasksForSelectedDate,
    handleDayPress,
    handleMonthSelect,
    handleYearChange,
    formatMonthYear,
    isSelected,
  } = useCalendar(tasks);

  const handleTaskPress = (task: Task) => {
    // Pass a param to indicate we came from calendar
    router.push(`/(tabs)/task-details/${task.id}?from=calendar` as any);
  };

  return (
    <>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.monthYearButton}
            onPress={() => setShowMonthYearModal(true)}
            activeOpacity={0.7}
          >
            <Text style={styles.monthYearText}>
              {formatMonthYear(currentMonth, currentYear)}
            </Text>
            <Ionicons
              name="chevron-down"
              size={20}
              color={isDark ? CommonColors.white : TextColors.primary}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Days Scroll */}
      <View style={styles.daysContainer}>
        <FlatList
          data={daysOfMonth}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => `${item.dayNumber}-${index}`}
          renderItem={({ item }) => {
            const selected = isSelected(item.date);

            return (
              <TouchableOpacity
                style={[styles.dayItem, selected && styles.dayItemSelected]}
                onPress={() => handleDayPress(item.date)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.dayNumber,
                    selected && styles.dayNumberSelected,
                  ]}
                >
                  {item.dayNumber}
                </Text>
                <Text
                  style={[styles.dayName, selected && styles.dayNameSelected]}
                >
                  {item.dayName}
                </Text>
              </TouchableOpacity>
            );
          }}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        />
      </View>

      {/* Tasks List */}
      <View style={styles.tasksContainer}>
        <Text style={styles.tasksHeader}>
          {selectedDate
            ? selectedDate.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })
            : "Tasks"}
        </Text>
        {tasksForSelectedDate.length > 0 ? (
          <ScrollView showsVerticalScrollIndicator={true}>
            {tasksForSelectedDate.map((task) => (
              <TouchableOpacity
                key={task.id}
                style={styles.taskItem}
                onPress={() => handleTaskPress(task)}
                activeOpacity={0.7}
              >
                <View style={styles.taskDot} />
                <View style={styles.taskContent}>
                  <Text style={styles.taskTitle}>{task.title}</Text>
                  {task.dueDate && (
                    <Text style={styles.taskTime}>
                      Due:{" "}
                      {task.dueDate.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              You have no tasks on that day
            </Text>
          </View>
        )}
      </View>

      {/* Month/Year Picker Modal */}
      <MonthYearPicker
        visible={showMonthYearModal}
        currentMonth={currentMonth}
        currentYear={currentYear}
        onClose={() => setShowMonthYearModal(false)}
        onMonthSelect={(month) => {
          handleMonthSelect(month);
          setShowMonthYearModal(false);
        }}
        onYearChange={handleYearChange}
      />
    </>
  );
}
