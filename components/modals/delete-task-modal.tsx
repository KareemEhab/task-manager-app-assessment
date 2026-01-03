import Ionicons from "@expo/vector-icons/Ionicons";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { CommonColors, DarkColors, TextColors } from "@/constants/theme";
import { useTheme } from "@/contexts/theme-context";
import { Button } from "@/components/common/button/button";

type DeleteTaskModalProps = {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
};

export function DeleteTaskModal({
  visible,
  onClose,
  onConfirm,
  isLoading = false,
}: DeleteTaskModalProps) {
  const { isDark } = useTheme();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View
          style={[
            styles.modalContent,
            {
              backgroundColor: isDark ? DarkColors.darkBorder : CommonColors.white,
            },
          ]}
          onStartShouldSetResponder={() => true}
        >
          <Ionicons
            name="warning-outline"
            size={48}
            color={CommonColors.error}
            style={styles.warningIcon}
          />
          <Text
            style={[
              styles.modalTitle,
              { color: isDark ? CommonColors.white : TextColors.primary },
            ]}
          >
            Are you sure you want to delete this task?
          </Text>

          <View style={styles.buttonsContainer}>
            <Button
              variant="danger"
              title="Delete"
              onPress={onConfirm}
              style={styles.button}
              loading={isLoading}
              disabled={isLoading}
            />
            <Button
              variant="cancel"
              title="Cancel"
              onPress={onClose}
              style={styles.button}
              disabled={isLoading}
            />
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  modalContent: {
    width: "100%",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
  },
  warningIcon: {
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 24,
  },
  buttonsContainer: {
    width: "100%",
    gap: 12,
  },
  button: {
    width: "100%",
  },
});

