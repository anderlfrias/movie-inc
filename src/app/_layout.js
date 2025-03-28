import { Stack } from "expo-router";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Layout() {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#000",
            paddingTop: insets.top,
          },
          headerTintColor: "#fff",
          headerTitle: "Movies Inc.",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </View>
  );
}
