import ScreenLayout from "../components/screen-layout";
import { FlatList, Text } from "react-native";
import { useMovies } from "../hooks/useMovies";
import MovieCard from "../components/movie/card";
import Title from "../components/title";

export default function HomeScreen() {
  const { movies, loading, error } = useMovies();
  // TODO: Implement authentication flow
  // const { getSession } = useAuth();

  // const onAuthenticate = async () => {
  //   // await authenticateUser();
  //   console.log("User authenticated", getSession());
  // };

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
      <Title text="En Cartelera" />
      <FlatList
        data={movies}
        renderItem={({ item, key }) => <MovieCard key={key} movie={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </ScreenLayout>
  );
}
