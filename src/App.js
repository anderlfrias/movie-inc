import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useMovies } from "./hooks/useMovies";
import ScreenLayout from "./components/screen-layout";
import ErrorMessage from "./components/error-message";
import Title from "./components/title";
import MovieList from "./components/movie/list";

export default function App() {
  const { movies, loading, error } = useMovies();

  if (error) {
    return (
      <ScreenLayout>
        <ErrorMessage error={error} />
      </ScreenLayout>
    );
  }

  if (loading) {
    return <ScreenLayout loading={true} />;
  }
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <ScreenLayout>
        <Title text="En Cartelera" />
        <MovieList movies={movies} />
      </ScreenLayout>
    </SafeAreaProvider>
  );
}
