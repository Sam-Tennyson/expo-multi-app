import { getAppExtra, getAppName, getPrimaryColor } from "@/core/app-config";
import { commonStyles } from "@/core/common-styles";
import { View } from "react-native";
import { ThemedText } from "../themed-text";

export default function CustomHeader() {
  const primaryColor = getPrimaryColor();
  const appName = getAppName();
  const extra = getAppExtra();
  return (
    <View style={commonStyles.header}>
      <View style={[commonStyles.dot, { backgroundColor: primaryColor }]} />
      <View style={commonStyles.headerText}>
        <ThemedText type="subtitle">{appName}</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          One codebase · {extra.appVariant ?? "unknown"} variant
        </ThemedText>
      </View>
    </View>
  );
}
