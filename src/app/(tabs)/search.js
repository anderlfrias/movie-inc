import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import ScreenLayout from "../../components/screen-layout";
import { useCallback, useState } from "react";
import { CloseIcon, SearchIcon } from "../../components/icons";
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

  const onChangeQuery = async (text) => {
    setLoading(true);
    setQuery(text);
    debouncedSearchMovies(text);
  };

  const clearSearch = () => {
    setQuery("");
    setMovies([]);
    setLoading(false);
    setError(null);
  };

  const searchMovies = useCallback(async (query) => {
    if (query.trim() === "") return clearSearch();
    setLoading(true);
    setError(null);

    const resp = await apiGetMovies(query);
    setLoading(false);
    if (resp.success) {
      const mappedMovies = resp.data.results
        .map(mapMovieData)
        .sort((a, b) => a.title.localeCompare(b.title));

      setMovies(mappedMovies);
    } else {
      setError(resp.message || resp.error.toString() || "Error desconocido");
    }
  }, []);

  const debouncedSearchMovies = useCallback(
    debounce((q) => {
      searchMovies(q);
    }, 500),
    [searchMovies],
  );

  return (
    <ScreenLayout error={error}>
      <View style={styles.container}>
        <SearchIcon color="#bbb" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Buscar películas..."
          placeholderTextColor="#aaa"
          value={query}
          onChangeText={onChangeQuery}
          onSubmitEditing={() => searchMovies(query)}
          onBlur={() => searchMovies(query)}
          returnKeyType="search"
        />
        {query.length > 0 && (
          <Pressable onPress={clearSearch} style={styles.clearButton}>
            <CloseIcon color="#bbb" size={20} />
          </Pressable>
        )}
      </View>

      {error ? (
        <ErrorMessage message={error} />
      ) : loading ? (
        <Text style={styles.placeholder}>Buscando películas...</Text>
      ) : query === "" ? (
        <Text style={styles.placeholder}>
          Encuentra las mejores películas aquí...
        </Text>
      ) : movies.length === 0 ? (
        <Text style={styles.placeholder}>
          No se encontraron películas para "{query}"
        </Text>
      ) : null}

      <MovieList movies={movies} />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
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
  placeholder: {
    color: "#aaa",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});
