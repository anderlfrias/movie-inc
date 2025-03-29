import { Link } from "expo-router";
import ScreenLayout from "../components/screen-layout";
import { FlatList, Pressable, Text } from "react-native";
import { useMovies } from "../hooks/useMovies";
import MovieCard from "../components/movie/card";
import useAuth from "../hooks/useAuth";

export default function HomeScreen() {
  const { movies, loading, error } = useMovies();
  const { authenticateUser, getSession } = useAuth();

  const onAuthenticate = async () => {
    // await authenticateUser();
    console.log("User authenticated", getSession());
  };

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

      <Pressable onPress={onAuthenticate}>
        <Text
          style={{
            color: "#fff",
            fontSize: 16,
            fontWeight: "bold",
            padding: 10,
            borderColor: "#fff",
            borderWidth: 1,
            textAlign: "center",
            marginVertical: 10,
            borderRadius: 5,
          }}
        >
          Authenticate
        </Text>
      </Pressable>
      <FlatList
        data={movies}
        renderItem={({ item, key }) => <MovieCard key={key} movie={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </ScreenLayout>
  );
}
