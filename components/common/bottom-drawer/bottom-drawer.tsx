import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useTheme } from "@/contexts/theme-context";
import { getBottomDrawerStyles } from "./bottom-drawer.styles";

type BottomDrawerProps = {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  snapPoints?: string[];
};

export function BottomDrawer({
  visible,
  onClose,
  children,
  snapPoints = ["60%", "95%"],
}: BottomDrawerProps) {
  const { isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const sheetRef = useRef<BottomSheetModal>(null);

  const memoSnapPoints = useMemo(() => snapPoints, [snapPoints]);
  const initialIndex = useMemo(
    () => Math.max(0, memoSnapPoints.length - 1),
    [memoSnapPoints.length]
  );
  const styles = getBottomDrawerStyles(isDark);

  useEffect(() => {
    if (visible) {
      sheetRef.current?.present();
    } else {
      sheetRef.current?.dismiss();
    }
  }, [visible]);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.5}
        pressBehavior="close"
      />
    ),
    []
  );

  return (
    <BottomSheetModal
      ref={sheetRef}
      index={initialIndex}
      snapPoints={memoSnapPoints}
      enablePanDownToClose
      onDismiss={onClose}
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.background}
      handleIndicatorStyle={styles.handleIndicator}
      topInset={insets.top}
      // Let the sheet itself respect the safe-area, so we don't need extra scroll padding
      bottomInset={insets.bottom}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      android_keyboardInputMode="adjustResize"
      enableHandlePanningGesture={true}
      enableContentPanningGesture={true}
    >
      {children}
    </BottomSheetModal>
  );
}
