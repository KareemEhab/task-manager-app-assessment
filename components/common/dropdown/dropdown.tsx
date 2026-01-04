import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useRef, useState } from "react";
import {
  InteractionManager,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { BrandColors, DarkColors, TextColors } from "@/constants/theme";
import { useTheme } from "@/contexts/theme-context";
import { getDropdownStyles } from "./dropdown.styles";

type DropdownOption = {
  label: string;
  value: string;
};

type DropdownProps = {
  label: string;
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  error?: string;
  scrollViewRef?: React.RefObject<ScrollView> | React.RefObject<any>; // For BottomSheetScrollView compatibility
};

let dropdownZIndex = 1000;

export function Dropdown({
  label,
  value,
  options,
  onChange,
  error,
  scrollViewRef,
}: DropdownProps) {
  const { isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<View>(null);
  const [zIndex] = useState(() => {
    dropdownZIndex += 10;
    return dropdownZIndex;
  });
  const hasError = !!error;
  const isFilled = !!value;
  const selectedOption = options.find((opt) => opt.value === value);
  const styles = getDropdownStyles(isDark, isFilled, hasError, zIndex, isOpen);

  // Auto-scroll to dropdown when it opens
  useEffect(() => {
    if (isOpen && containerRef.current) {
      // Wait for the dropdown to render and then scroll
      InteractionManager.runAfterInteractions(() => {
        setTimeout(() => {
          containerRef.current?.measure((x, y, width, height, pageX, pageY) => {
            // If a ScrollView ref is provided, scroll to the dropdown position
            if (scrollViewRef?.current) {
              try {
                // Calculate scroll offset (position - some padding)
                // pageY is relative to the window, we need to account for the ScrollView's contentOffset
                const scrollOffset = Math.max(0, pageY - 150); // 150px padding from top

                // For regular ScrollView and BottomSheetScrollView (both extend ScrollView)
                if (scrollViewRef.current.scrollTo) {
                  scrollViewRef.current.scrollTo({
                    y: scrollOffset,
                    animated: true,
                  });
                }
                // Fallback: Try scrollToOffset for BottomSheetScrollView (if available)
                else if (
                  typeof scrollViewRef.current.scrollToOffset === "function"
                ) {
                  scrollViewRef.current.scrollToOffset({
                    offset: scrollOffset,
                    animated: true,
                  });
                }
              } catch (e) {
                // Silently fail if scroll fails
                console.log("Could not scroll to dropdown:", e);
              }
            }
            // Note: Without a scrollViewRef, we can't programmatically scroll
            // The dropdown will still be visible, just may require manual scrolling
          });
        }, 150); // Small delay to ensure dropdown is rendered
      });
    }
  }, [isOpen, scrollViewRef]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <View ref={containerRef} style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.dropdownContainer}>
        <TouchableOpacity
          style={[
            styles.dropdown,
            isFilled && styles.dropdownFilled,
            hasError && styles.dropdownError,
          ]}
          onPress={handleToggle}
          activeOpacity={0.7}
        >
          <Text style={[styles.dropdownText, !value && styles.placeholder]}>
            {selectedOption?.label || "Select an option"}
          </Text>
          <Ionicons
            name={isOpen ? "chevron-up" : "chevron-down"}
            size={20}
            color={isDark ? DarkColors.dark4 : TextColors.secondary}
          />
        </TouchableOpacity>

        {isOpen && (
          <>
            {/* Click-outside overlay: closes dropdown without blocking scroll (pointerEvents=box-none) */}
            <Pressable
              style={styles.outsideOverlay}
              pointerEvents="box-none"
              onPress={() => setIsOpen(false)}
            />
            <View style={styles.optionsWrapper}>
              <ScrollView
                style={styles.optionsScroll}
                nestedScrollEnabled
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={true}
              >
                {options.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    style={[
                      styles.option,
                      value === option.value && styles.optionSelected,
                    ]}
                    onPress={() => {
                      onChange(option.value);
                      setIsOpen(false);
                    }}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        value === option.value && styles.optionTextSelected,
                      ]}
                    >
                      {option.label}
                    </Text>
                    {value === option.value && (
                      <Ionicons
                        name="checkmark"
                        size={16}
                        color={BrandColors.main}
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </>
        )}
      </View>
      {hasError && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}
