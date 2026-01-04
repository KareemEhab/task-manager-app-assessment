import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import {
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
};

let dropdownZIndex = 1000;

export function Dropdown({
  label,
  value,
  options,
  onChange,
  error,
}: DropdownProps) {
  const { isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [zIndex] = useState(() => {
    dropdownZIndex += 10;
    return dropdownZIndex;
  });
  const hasError = !!error;
  const isFilled = !!value;
  const selectedOption = options.find((opt) => opt.value === value);
  const styles = getDropdownStyles(isDark, isFilled, hasError, zIndex, isOpen);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.dropdownContainer}>
        <TouchableOpacity
          style={[
            styles.dropdown,
            isFilled && styles.dropdownFilled,
            hasError && styles.dropdownError,
          ]}
          onPress={() => setIsOpen(!isOpen)}
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
