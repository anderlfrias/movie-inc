import { Link } from "expo-router";
import ScreenLayout from "../components/screen-layout";
import { FlatList, Text } from "react-native";
import { useMovies } from "../hooks/useMovies";
import MovieCard from "../components/movie/card";

export default function HomeScreen() {
  const { movies, loading, error } = useMovies();

  if (error) {
    return (
      <ScreenLayout>
        <Text style={{ color: "#fff" }}>{error}</Text>
      </ScreenLayout>
    );
  }

  if (loading) {
    return <ScreenLayout loading={true} />;
  }

  return (
    <ScreenLayout>
      <Link href={"/search"} asChild>
        <Text
          style={{
            color: "#fff",
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Go to Search
        </Text>
      </Link>
      <FlatList
        data={movies}
        renderItem={({ item, key }) => <MovieCard key={key} movie={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </ScreenLayout>
  );
}
