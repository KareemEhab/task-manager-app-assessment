import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, TouchableOpacity, View } from "react-native";

import { useTheme } from "@/contexts/theme-context";
import { getTagStyles } from "./tag.styles";

export type TagVariant = "low" | "medium" | "high" | "default";

type TagProps = {
  label: string;
  variant?: TagVariant;
  onDelete?: () => void;
};

export function Tag({ label, variant = "default", onDelete }: TagProps) {
  const { isDark } = useTheme();
  const { styles, textColor } = getTagStyles(isDark, variant);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>
      {onDelete && (
        <TouchableOpacity
          onPress={onDelete}
          style={styles.deleteButton}
          activeOpacity={0.7}
        >
          <Ionicons name="close" size={14} color={textColor} />
        </TouchableOpacity>
      )}
    </View>
  );
}
