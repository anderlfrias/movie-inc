import { Text, View } from "react-native";
import ScreenLayout from "../../components/screen-layout";
import Title from "../../components/title";
import { useFavoritesMovies } from "../../hooks/useFavoritesMovies";

export default function Favorite() {
  const { movies } = useFavoritesMovies();
  return (
    <ScreenLayout>
      <Title text="Mis Favoritos" />

      <Text
        style={{
          fontFamily: "monospace",
          fontSize: 14,
          backgroundColor: "#eaeaea",
          padding: 10,
          borderRadius: 5,
          color: "#333",
        }}
      >
        {JSON.stringify(movies, null, 2)}
      </Text>
    </ScreenLayout>
  );
}
