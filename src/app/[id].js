import { Text, View } from "react-native";

export default function MovieDetails() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#000",
        paddingTop: 20,
        paddingBottom: 20,
      }}
    >
      <Text
        style={{
          color: "#fff",
          fontSize: 24,
          fontWeight: "bold",
        }}
      >
        Movie Details
      </Text>
    </View>
  );
}
