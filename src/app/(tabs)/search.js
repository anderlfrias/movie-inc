import { StyleSheet, TextInput, View } from "react-native";
import ScreenLayout from "../../components/screen-layout";
import { use, useEffect, useState } from "react";
import { SearchIcon } from "../../components/icons";
import { apiGetMovies } from "../../api/movie";
import { mapMovieData } from "../../utils/mappers";
import ErrorMessage from "../../components/error-message";
import MovieList from "../../components/movie/list";
import { debounce } from "../../utils/debounce";

export default function Search() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onChangeQuery = (text) => {
    setQuery(text);
    debouncedSearch(text);
  };

  const searchMovies = async (text) => {
    if (!text.trim()) return;

    setLoading(true);
    setError(null);

    const resp = await apiGetMovies(text);
    if (resp.success) {
      const mappedMovies = resp.data.results
        .map(mapMovieData)
        .sort((a, b) => a.title.localeCompare(b.title));

      setMovies(mappedMovies);
    } else {
      setError(resp.error.toString());
    }
    setLoading(false);
  };

  const debouncedSearch = debounce(searchMovies, 500);

  // useEffect(() => {
  //   const fetchMovies = async () => {
  //     const resp = await apiGetMovies(query);
  //     if (resp.success) {
  //       const mappedMovies = resp.data.results
  //         .map(mapMovieData)
  //         .sort((a, b) => a.title.localeCompare(b.title));

  //       setMovies(mappedMovies);
  //     } else {
  //       setError(resp.error.toString());
  //     }
  //   };

  //   fetchMovies();
  // }, [query]);

  return (
    <ScreenLayout loading={loading} error={error}>
      <View style={styles.container}>
        <SearchIcon color="#bbb" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Buscar películas..."
          placeholderTextColor="#aaa"
          value={query}
          onChangeText={onChangeQuery}
          onSubmitEditing={searchMovies}
          onBlur={searchMovies}
          returnKeyType="search"
        />
      </View>
      {error && <ErrorMessage message={error} />}

      <MovieList movies={movies} />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  // input: {
  //   height: 40,
  //   borderColor: "#ccc",
  //   borderWidth: 1,
  //   borderRadius: 8,
  //   paddingHorizontal: 10,
  //   marginBottom: 10,
  //   color: "#fff",
  // },
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#222",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#444",
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
  },
});
