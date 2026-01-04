import Ionicons from "@expo/vector-icons/Ionicons";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { useState } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";

import { BrandColors, TextColors } from "@/constants/theme";
import { useTheme } from "@/contexts/theme-context";
import { Tag } from "../tag/tag";
import { getCategoriesInputStyles } from "./categories-input.styles";

type CategoriesInputProps = {
  label: string;
  categories: string[];
  onChange: (categories: string[]) => void;
  error?: string;
};

export function CategoriesInput({
  label,
  categories,
  onChange,
  error,
}: CategoriesInputProps) {
  const { isDark } = useTheme();
  const [inputValue, setInputValue] = useState("");
  const hasError = !!error;
  const isFilled = categories.length > 0;

  const styles = getCategoriesInputStyles(isDark, isFilled, hasError);

  const handleAddCategory = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !categories.includes(trimmed)) {
      onChange([...categories, trimmed]);
      setInputValue("");
    }
  };

  const handleRemoveCategory = (categoryToRemove: string) => {
    onChange(categories.filter((cat) => cat !== categoryToRemove));
  };

  const handleKeyPress = (e: any) => {
    if (e.nativeEvent.key === "Enter") {
      handleAddCategory();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <View
          style={[
            styles.inputWrapper,
            isFilled && styles.inputFilled,
            hasError && styles.inputError,
          ]}
        >
          <BottomSheetTextInput
            style={styles.input}
            placeholder="Add Categories (Press Enter)"
            placeholderTextColor={TextColors.placeholder}
            value={inputValue}
            onChangeText={setInputValue}
            onSubmitEditing={handleAddCategory}
            onKeyPress={handleKeyPress}
            autoComplete="off"
            autoCorrect={false}
            spellCheck={false}
            importantForAutofill="no"
            textContentType="none"
            editable={true}
            autoFocus={false}
            {...(Platform.OS === "android"
              ? ({ includeFontPadding: false } as any)
              : {})} // Remove Android's default font padding
          />
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddCategory}
          activeOpacity={0.7}
        >
          <Ionicons name="add" size={20} color={BrandColors.main} />
        </TouchableOpacity>
      </View>
      {categories.length > 0 && (
        <View style={styles.categoriesContainer}>
          {categories.map((category, index) => (
            <Tag
              key={index}
              label={category}
              variant="default"
              onDelete={() => handleRemoveCategory(category)}
            />
          ))}
        </View>
      )}
      {hasError && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}
