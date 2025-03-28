import { View } from "react-native";

export default function ScreenLayout({ children }) {
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
