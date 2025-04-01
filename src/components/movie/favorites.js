import { View } from "react-native";
import Title from "../title";
import MovieList from "./list";
import { useFavorites } from "../../context/favorites-context";

export default function FavoritesList({ style, horizontal }) {
  const { favorites } = useFavorites();
  return (
    <View style={style}>
      <Title text="Favorites" />
      <MovieList movies={favorites} horizontal={horizontal} />
    </View>
  );
}
