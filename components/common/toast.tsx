import { useEffect } from "react";
import { ActivityIndicator, Modal, StyleSheet, Text, View } from "react-native";

import { CommonColors, DarkColors, TextColors } from "@/constants/theme";
import { useTheme } from "@/contexts/theme-context";

type ToastProps = {
  visible: boolean;
  message: string;
  loading?: boolean;
  onHide: () => void;
};

export function Toast({ visible, message, loading = false, onHide }: ToastProps) {
  const { isDark } = useTheme();

  useEffect(() => {
    if (visible && !loading) {
      const timer = setTimeout(() => {
        onHide();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [visible, loading, onHide]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onHide}
    >
      <View style={styles.container}>
        <View
          style={[
            styles.toast,
            {
              backgroundColor: isDark ? DarkColors.darkBorder : CommonColors.white,
            },
          ]}
        >
          {loading ? (
            <ActivityIndicator size="small" color={CommonColors.white} />
          ) : (
            <Text
              style={[
                styles.message,
                { color: isDark ? CommonColors.white : TextColors.primary },
              ]}
            >
              {message}
            </Text>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 100,
  },
  toast: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    minWidth: 200,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  message: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
});

