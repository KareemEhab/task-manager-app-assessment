import Ionicons from "@expo/vector-icons/Ionicons";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { CommonColors, DarkColors, TextColors } from "@/constants/theme";
import { useTheme } from "@/contexts/theme-context";
import { Button } from "@/components/common/button/button";

type LogoutModalProps = {
  visible: boolean;
  onClose: () => void;
};

export function LogoutModal({ visible, onClose }: LogoutModalProps) {
  const { isDark } = useTheme();

  const handleLogout = () => {
    // Handle logout logic here
    console.log("User logged out");
    onClose();
    // Navigate to sign-in screen or clear auth state
  };

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
            Are you sure you want to logout?
          </Text>

          <View style={styles.buttonsContainer}>
            <Button
              variant="danger"
              title="Logout"
              onPress={handleLogout}
              style={styles.button}
            />
            <Button
              variant="cancel"
              title="Cancel"
              onPress={onClose}
              style={styles.button}
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

