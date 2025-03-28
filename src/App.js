import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { useMovies } from "./hooks/useMovies";
import MovieCard from "./components/movie-card";
import { Link } from "expo-router";
import ScreenLayout from "./components/screen-layout";

export default function App() {
  const { movies, loading, error } = useMovies();

  if (error) {
    return (
      <View style={{ flex: 1, backgroundColor: "#000", padding: 20 }}>
        <Text style={{ color: "#fff" }}>{error}</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <ActivityIndicator color={"#fff"} size="large" style={{ flex: 1 }} />
    );
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
        // numColumns={3}
        keyExtractor={(item) => item.id.toString()}
      />
    </ScreenLayout>
  );
}
