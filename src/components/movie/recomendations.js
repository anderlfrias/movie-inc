import { View } from "react-native";
import { useRecomendations } from "../../hooks/useRecomendatios";
import Title from "../title";
import MovieCard from "./card";

export default function MovieRecomendations({ movieId, style }) {
  const { movies, loading, error } = useRecomendations(movieId);

  return (
    <View style={style}>
      <Title text="Recomendaciones" />

      {movies.map((item) => (
        <MovieCard key={item.id} movie={item} />
      ))}
    </View>
  )
}