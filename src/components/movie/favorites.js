import { Text, View } from "react-native";
import Title from "../title";
import MovieList from "./list";
import { useFavorites } from "../../context/favorites-context";

export default function FavoritesList({ style, horizontal }) {
  const { favorites } = useFavorites();
  console.log(favorites);
  return (
    <View style={style}>
      <Title text="Favorites" />
      {favorites.length === 0 && (
        <Text
          style={{
            color: "#aaa",
            fontSize: 16,
            textAlign: "center",
            marginTop: 20,
          }}
        >
          No tienes favoritos
        </Text>
      )}
      <MovieList
        style={{ marginBottom: 82 }}
        movies={favorites}
        horizontal={horizontal}
      />
    </View>
  );
}
