import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useEffect, useRef, useState } from "react";
import { InteractionManager, Platform, Text, TouchableOpacity, View } from "react-native";

import { DarkColors, TextColors } from "@/constants/theme";
import { useTheme } from "@/contexts/theme-context";
import { getSimpleDatePickerStyles } from "./simple-date-picker.styles";

type SimpleDatePickerProps = {
  label: string;
  value: Date | null;
  onChange: (date: Date) => void;
  error?: string;
  minimumDate?: Date;
  scrollViewRef?: React.RefObject<any>; // For auto-scrolling when picker opens
};

export function SimpleDatePicker({
  label,
  value,
  onChange,
  error,
  minimumDate,
  scrollViewRef,
}: SimpleDatePickerProps) {
  const { isDark } = useTheme();
  const [showPicker, setShowPicker] = useState(false);
  const [tempDate, setTempDate] = useState<Date>(value || new Date());
  const containerRef = useRef<View>(null);
  const iosMajorVersion =
    Platform.OS === "ios"
      ? typeof Platform.Version === "string"
        ? parseInt(Platform.Version, 10)
        : (Platform.Version as number)
      : 0;

  const hasError = !!error;
  const isFilled = !!value;

  // Auto-scroll when picker opens
  useEffect(() => {
    if (showPicker && scrollViewRef?.current && containerRef.current) {
      // Wait for picker to render and then scroll
      const timer = setTimeout(() => {
        try {
          InteractionManager.runAfterInteractions(() => {
            if (!scrollViewRef?.current || !containerRef.current) return;
            
            // Measure the container's position
            containerRef.current.measure((x, y, width, height, pageX, pageY) => {
              if (scrollViewRef?.current && pageY > 0) {
                // Scroll to show the date picker with some padding from top
                const scrollOffset = Math.max(0, pageY - 150);
                scrollViewRef.current.scrollTo({
                  y: scrollOffset,
                  animated: true,
                });
              }
            });
          });
        } catch (error) {
          // Silently fail if scroll fails
          console.log("Date picker auto-scroll failed:", error);
        }
      }, 300); // Wait for picker animation

      return () => clearTimeout(timer);
    }
  }, [showPicker, scrollViewRef]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowPicker(false);
      if (event.type === "set" && selectedDate) {
        onChange(selectedDate);
      }
    } else {
      if (selectedDate) {
        setTempDate(selectedDate);
        // On iOS we show it inline; commit immediately and close.
        onChange(selectedDate);
        setShowPicker(false);
      }
    }
  };

  const handleCancel = () => {
    setTempDate(value || new Date());
    setShowPicker(false);
  };

  const styles = getSimpleDatePickerStyles(isDark, isFilled, hasError);

  return (
    <View style={styles.container} ref={containerRef} collapsable={false}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={[
          styles.inputContainer,
          isFilled && styles.inputFilled,
          hasError && styles.inputError,
        ]}
        onPress={() => {
          setTempDate(value || new Date());
          setShowPicker(true);
        }}
        activeOpacity={0.7}
      >
        <Text style={[styles.input, !value && styles.placeholder]}>
          {value ? formatDate(value) : "Select date"}
        </Text>
        <Ionicons
          name="calendar-outline"
          size={20}
          color={isDark ? DarkColors.dark4 : TextColors.secondary}
        />
      </TouchableOpacity>
      {hasError && <Text style={styles.errorText}>{error}</Text>}

      {Platform.OS === "android" && showPicker && (
        <DateTimePicker
          value={tempDate}
          mode="date"
          display="default"
          minimumDate={minimumDate}
          onChange={handleDateChange}
        />
      )}

      {Platform.OS === "ios" && showPicker && (
        <View style={styles.iosInlineWrapper}>
          <View style={styles.iosInlineHeader}>
            <TouchableOpacity onPress={handleCancel} activeOpacity={0.7}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
          </View>
          <DateTimePicker
            value={tempDate}
            mode="date"
            display={iosMajorVersion >= 14 ? "inline" : "spinner"}
            minimumDate={minimumDate}
            onChange={handleDateChange}
            themeVariant={isDark ? "dark" : "light"}
            style={styles.picker}
          />
        </View>
      )}
    </View>
  );
}
