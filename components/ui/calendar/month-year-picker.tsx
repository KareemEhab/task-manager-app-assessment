import Ionicons from "@expo/vector-icons/Ionicons";
import { Modal, Text, TouchableOpacity, View } from "react-native";

import { CommonColors, TextColors } from "@/constants/theme";
import { useTheme } from "@/contexts/theme-context";
import { getMonthYearPickerStyles } from "./month-year-picker.styles";

type MonthYearPickerProps = {
  visible: boolean;
  currentMonth: number;
  currentYear: number;
  onClose: () => void;
  onMonthSelect: (month: number) => void;
  onYearChange: (delta: number) => void;
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function MonthYearPicker({
  visible,
  currentMonth,
  currentYear,
  onClose,
  onMonthSelect,
  onYearChange,
}: MonthYearPickerProps) {
  const { isDark } = useTheme();
  const styles = getMonthYearPickerStyles(isDark);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View
          style={styles.modalContent}
          onStartShouldSetResponder={() => true}
        >
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Month</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={onClose}
              activeOpacity={0.7}
            >
              <Ionicons
                name="close"
                size={24}
                color={isDark ? CommonColors.white : TextColors.primary}
              />
            </TouchableOpacity>
          </View>

          {/* Year Selector */}
          <View style={styles.yearSelector}>
            <TouchableOpacity
              style={styles.yearButton}
              onPress={() => onYearChange(-1)}
              activeOpacity={0.7}
            >
              <Ionicons
                name="chevron-back"
                size={20}
                color={isDark ? CommonColors.white : TextColors.primary}
              />
            </TouchableOpacity>
            <Text style={styles.yearText}>{currentYear}</Text>
            <TouchableOpacity
              style={styles.yearButton}
              onPress={() => onYearChange(1)}
              activeOpacity={0.7}
            >
              <Ionicons
                name="chevron-forward"
                size={20}
                color={isDark ? CommonColors.white : TextColors.primary}
              />
            </TouchableOpacity>
          </View>

          {/* Month Grid */}
          <View style={styles.monthYearGrid}>
            {months.map((month, index) => {
              const isSelectedMonth = index === currentMonth;
              return (
                <TouchableOpacity
                  key={month}
                  style={[
                    styles.monthYearItem,
                    isSelectedMonth && styles.monthYearItemSelected,
                  ]}
                  onPress={() => onMonthSelect(index)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.monthYearItemText,
                      isSelectedMonth && styles.monthYearItemTextSelected,
                    ]}
                  >
                    {month.substring(0, 3)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}
