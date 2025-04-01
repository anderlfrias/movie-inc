import { FlatList } from "react-native";
import ScreenLayout from "../../components/screen-layout";
import Title from "../../components/title";
import MovieCard from "../../components/movie/card";
import { useFavorites } from "../../context/favorites-context";

export default function Favorite() {
  const { movies } = useFavorites();

  return (
    <ScreenLayout>
      <Title text="Mis Favoritos" />
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieCard movie={item} />}
      />
    </ScreenLayout>
  );
}
