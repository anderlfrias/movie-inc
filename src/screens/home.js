import ScreenLayout from "../components/screen-layout";
import { useMovies } from "../hooks/useMovies";
import Title from "../components/title";
import MovieList from "../components/movie/list";
import ErrorMessage from "../components/error-message";

export default function HomeScreen() {
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
    <ScreenLayout>
      <Title text="Reproducciendo Ahora" />
      <MovieList movies={movies} />
    </ScreenLayout>
  );
}
