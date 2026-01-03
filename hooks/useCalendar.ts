import { useEffect, useMemo, useState } from "react";

import { Task } from "@/data/tasks";

export function useCalendar(tasks: Task[]) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // Set today as selected on mount
  useEffect(() => {
    const today = new Date();
    setSelectedDate(today);
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
  }, []);

  // Get days of the current month
  const daysOfMonth = useMemo(() => {
    const year = currentYear;
    const month = currentMonth;
    const lastDay = new Date(year, month + 1, 0);
    const days: { date: Date; dayName: string; dayNumber: number }[] = [];

    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      days.push({
        date,
        dayName: date.toLocaleDateString("en-US", { weekday: "short" }),
        dayNumber: i,
      });
    }

    return days;
  }, [currentMonth, currentYear]);

  // Get tasks for selected date
  // Show tasks from createdOn date until dueDate
  const tasksForSelectedDate = useMemo(() => {
    if (!selectedDate) return [];

    // Reset time to compare only dates
    const selectedDateOnly = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate()
    );

    return tasks.filter((task) => {
      if (!task.dueDate) return false;

      const taskDueDate = new Date(task.dueDate);
      const taskDueDateOnly = new Date(
        taskDueDate.getFullYear(),
        taskDueDate.getMonth(),
        taskDueDate.getDate()
      );

      // Get created date
      const taskCreatedOn = new Date(task.createdOn);
      const taskCreatedOnOnly = new Date(
        taskCreatedOn.getFullYear(),
        taskCreatedOn.getMonth(),
        taskCreatedOn.getDate()
      );

      // Show tasks if the selected date is between createdOn and dueDate (inclusive)
      return (
        selectedDateOnly >= taskCreatedOnOnly &&
        selectedDateOnly <= taskDueDateOnly
      );
    });
  }, [selectedDate, tasks]);

  const handleDayPress = (date: Date) => {
    setSelectedDate(date);
  };

  const handleMonthSelect = (month: number) => {
    setCurrentMonth(month);
    // Set selected date to first day of selected month
    const newDate = new Date(currentYear, month, 1);
    setSelectedDate(newDate);
  };

  const handleYearChange = (delta: number) => {
    setCurrentYear(currentYear + delta);
  };

  const formatMonthYear = (month: number, year: number) => {
    const date = new Date(year, month, 1);
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (date: Date) => {
    if (!selectedDate) return false;
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  return {
    selectedDate,
    currentMonth,
    currentYear,
    daysOfMonth,
    tasksForSelectedDate,
    handleDayPress,
    handleMonthSelect,
    handleYearChange,
    formatMonthYear,
    isToday,
    isSelected,
  };
}
