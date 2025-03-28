import { ActivityIndicator, View } from "react-native";

export default function ScreenLayout({ children, loading }) {
  if (loading) {
    return (
      <ActivityIndicator color={"#fff"} size="large" style={{ flex: 1 }} />
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#000",
        paddingHorizontal: 16,
      }}
    >
      {children}
    </View>
  );
}
