import { FlatList } from "react-native";
import ScreenLayout from "../../components/screen-layout";
import Title from "../../components/title";
import { useFavoritesMovies } from "../../hooks/useFavoritesMovies";
import MovieCard from "../../components/movie/card";
import { useCallback } from "react";
import { useFocusEffect } from "expo-router";

export default function Favorite() {
  const { movies, refetch } = useFavoritesMovies();

  useFocusEffect(
    useCallback(() => {
      console.log("Favorite screen - pantalla en foco");
      refetch();
    }, [refetch]),
  );

  return (
    <ScreenLayout>
      <Title text="Mis Favoritos" />
      <FlatList
        data={movies.reverse()} // Invertir el orden de la lista para mostrar los más recientes primero
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieCard movie={item} />}
      />
    </ScreenLayout>
  );
}
