import { Text, View } from "react-native";

export default function Search() {
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
        Search movies
      </Text>
    </View>
  );
}
