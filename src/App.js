import { FlatList, StyleSheet, Text, View } from "react-native";
import { useMovies } from "./hooks/useMovies";
import MovieCard from "./components/movie-card";
import { Link } from "expo-router";

export default function App() {
  const { movies, loading, error } = useMovies();

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "#fff" }}>{error}</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "#fff" }}>Loading...</Text>
      </View>
    );
  }

  return (
    <>
      <View>
        <Text
          style={{
            color: "#fff",
            fontSize: 24,
            fontWeight: "bold",
            paddingVertical: 20,
          }}
        >
          Movies Inc.
        </Text>
      </View>

      <Link href={"/search"} asChild>
        <Text
          style={{
            color: "#fff",
            fontSize: 16,
            fontWeight: "bold",
            paddingVertical: 20,
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
    </>
  );
}

const styles = StyleSheet.create({
  movieItem: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  poster: {
    width: 100,
    height: 150,
    resizeMode: "cover",
  },
  movieInfo: {
    marginLeft: 10,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
});
