import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import { StyleProp, ViewStyle } from "react-native";

export const commonStyles: StyleProp<ViewStyle> & {
  screen: StyleProp<ViewStyle>;
  safeArea: StyleProp<ViewStyle>;
  content: StyleProp<ViewStyle>;
  header: StyleProp<ViewStyle>;
  headerText: StyleProp<ViewStyle>;
  dot: StyleProp<ViewStyle>;
  composer: StyleProp<ViewStyle>;
} = {
  screen: { flex: 1, alignItems: "center" },
  safeArea: { flex: 1, width: "100%", maxWidth: MaxContentWidth },
  content: {
    gap: Spacing.four,
    padding: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.four,
  },
  header: { flexDirection: "row", alignItems: "center", gap: Spacing.three },
  headerText: { flex: 1 },
  dot: { width: 16, height: 48, borderRadius: 8 },
  composer: { flexDirection: "row", gap: Spacing.two },
};
