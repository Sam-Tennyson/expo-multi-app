import { ThemedView } from "@/components/themed-view";
import CustomHeader from "@/components/ui/custom-header";
import { commonStyles } from "@/core/common-styles";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  return (
    <ThemedView style={commonStyles.screen}>
      <SafeAreaView style={commonStyles.safeArea}>
        <ScrollView
          contentContainerStyle={commonStyles.content}
          keyboardShouldPersistTaps="handled"
        >
          <CustomHeader />
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
};

export default Profile;
