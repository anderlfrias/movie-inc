import { Stack } from "expo-router";
import { Text, View } from "react-native";
import { FavoriteIcon, SearchIcon } from "../components/icons";

export default function Layout() {
  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#000",
          },
          headerTitle: "",
          // Aqui se define el logo, pero en este caso solo usare el nombre: Movies Inc.
          headerLeft: () => (
            <Text style={{ color: "#fff", fontSize: 24, fontWeight: 600 }}>
              Movies Inc.
            </Text>
          ),
          headerRight: () => (
            <View style={{ flexDirection: "row", gap: 10 }}>
              <SearchIcon />
              <FavoriteIcon />
            </View>
          ),
        }}
      />
    </View>
  );
}
