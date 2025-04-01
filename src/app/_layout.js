import { Link, Stack } from "expo-router";
import { Image, Text, View } from "react-native";
import { FavoriteIcon, SearchIcon } from "../components/icons";
import { AuthProvider } from "../context/auth-context";
import { FavoritesProvider } from "../context/favorites-context";

export default function Layout() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <View style={{ flex: 1, backgroundColor: "#000" }}>
          <Stack
            screenOptions={{
              headerStyle: {
                backgroundColor: "#000",
              },
              headerTitle: "",
              headerLeft: () => (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <Image
                    source={require("../assets/movies-inc-logo.png")}
                    style={{ width: 32, height: 32 }}
                  />
                  <Text
                    style={{ color: "#fff", fontSize: 24, fontWeight: 600 }}
                  >
                    Movies Inc.
                  </Text>
                </View>
              ),
            }}
          />
        </View>
      </FavoritesProvider>
    </AuthProvider>
  );
}
